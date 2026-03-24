import { useEffect, useState, useMemo } from "react";
import { LifeBuoy } from "lucide-react";
import api from "./api";
import type { Ticket } from "./types";
import TicketForm from "./components/TicketForm";
import TicketList from "./components/TicketList";
import TicketDetailModal from "./components/TicketDetailModal";

function App() {
    const [tickets, setTickets] = useState<Ticket[]>([]);
    const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);

    // filter logic
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("ALL");
    const [priorityFilter, setPriorityFilter] = useState("ALL");

    const fetchTickets = async () => {
        try {
            const response = await api.get("/tickets/");
            setTickets(response.data);
        } catch (error) {
            console.error("Failed to fetch tickets:", error);
        }
    };

    // Fetch tickets when the app first loads
    useEffect(() => {
        fetchTickets();
    }, []);

    // --- FILTER LOGIC ---
    // useMemo ensures we only re-calculate this when tickets or filters change
    const filteredTickets = useMemo(() => {
        return tickets.filter((ticket) => {
            const matchesSearch =
                ticket.title
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase()) ||
                ticket.description
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase());
            const matchesStatus =
                statusFilter === "ALL" || ticket.status === statusFilter;
            const matchesPriority =
                priorityFilter === "ALL" || ticket.priority === priorityFilter;

            return matchesSearch && matchesStatus && matchesPriority;
        });
    }, [tickets, searchQuery, statusFilter, priorityFilter]);

    return (
        <div className="min-h-screen">
            <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center h-16 gap-2">
                        <div className="bg-blue-600 p-2 rounded-lg">
                            <LifeBuoy className="text-white" size={24} />
                        </div>
                        <h1 className="text-xl font-bold text-slate-900 tracking-tight">
                            IT Helpdesk
                        </h1>
                    </div>
                </div>
            </header>

            <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* --- SEARCH & FILTER BAR --- */}
                <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 mb-8 flex flex-wrap gap-4 items-center">
                    <div className="flex-1 min-w-[200px]">
                        <input
                            type="text"
                            placeholder="Search tickets..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none">
                        <option value="ALL">All Statuses</option>
                        <option value="OPEN">Open</option>
                        <option value="IN_PROGRESS">In Progress</option>
                        <option value="RESOLVED">Resolved</option>
                        <option value="CLOSED">Closed</option>
                    </select>
                    <select
                        value={priorityFilter}
                        onChange={(e) => setPriorityFilter(e.target.value)}
                        className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none">
                        <option value="ALL">All Priorities</option>
                        <option value="LOW">Low</option>
                        <option value="MEDIUM">Medium</option>
                        <option value="HIGH">High</option>
                        <option value="CRITICAL">Critical</option>
                    </select>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-1">
                        <TicketForm onTicketCreated={fetchTickets} />
                    </div>

                    <div className="lg:col-span-2">
                        <div className="mb-4 flex items-center justify-between">
                            <h2 className="text-xl font-semibold text-slate-800">
                                {searchQuery ||
                                statusFilter !== "ALL" ||
                                priorityFilter !== "ALL"
                                    ? "Filtered Tickets"
                                    : "Recent Tickets"}
                            </h2>
                            <span className="text-sm text-slate-500">
                                {filteredTickets.length} found
                            </span>
                        </div>

                        {/* PASS THE FILTERED LIST INSTEAD OF THE FULL LIST */}
                        <TicketList
                            tickets={filteredTickets}
                            onTicketClick={(ticket) =>
                                setSelectedTicket(ticket)
                            }
                        />
                    </div>
                </div>
            </main>

            {selectedTicket && (
                <TicketDetailModal
                    ticket={selectedTicket}
                    onClose={() => setSelectedTicket(null)}
                    onUpdate={fetchTickets}
                />
            )}
        </div>
    );
}

export default App;
