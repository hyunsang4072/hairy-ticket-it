import { formatDistanceToNow } from "date-fns";
import { Ticket as TicketIcon, Clock, AlertCircle } from "lucide-react";
import type { Ticket } from "../types";

interface Props {
    tickets: Ticket[];
    onTicketClick: (ticket: Ticket) => void;
}

export default function TicketList({ tickets, onTicketClick }: Props) {
    // Helper to color-code priorities
    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case "CRITICAL":
                return "bg-red-100 text-red-800 border-red-200";
            case "HIGH":
                return "bg-orange-100 text-orange-800 border-orange-200";
            case "MEDIUM":
                return "bg-blue-100 text-blue-800 border-blue-200";
            default:
                return "bg-slate-100 text-slate-800 border-slate-200";
        }
    };

    if (tickets.length === 0) {
        return (
            <div className="text-center p-12 bg-white rounded-xl border border-dashed border-slate-300">
                <TicketIcon className="mx-auto h-12 w-12 text-slate-400 mb-3" />
                <h3 className="text-lg font-medium text-slate-900">
                    No tickets yet
                </h3>
                <p className="text-slate-500">
                    When tickets are submitted, they will appear here.
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {tickets.map((ticket) => (
                <div
                    key={ticket.id}
                    onClick={() => onTicketClick(ticket)}
                    className="bg-white p-5 rounded-xl shadow-sm border border-slate-100 hover:shadow-md hover:border-blue-200 transition-all cursor-pointer group">
                    <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg font-semibold text-slate-800">
                            {ticket.title}
                        </h3>
                        <span
                            className={`px-2.5 py-1 rounded-full text-xs font-medium border ${getPriorityColor(
                                ticket.priority
                            )}`}>
                            {ticket.priority_display}
                        </span>
                    </div>

                    <p className="text-slate-600 text-sm mb-4 line-clamp-2">
                        {ticket.description}
                    </p>

                    <div className="flex items-center gap-4 text-xs text-slate-500">
                        <div className="flex items-center gap-1">
                            <AlertCircle size={14} />
                            {ticket.category_display}
                        </div>
                        <div className="flex items-center gap-1">
                            <Clock size={14} />
                            {formatDistanceToNow(new Date(ticket.created_at), {
                                addSuffix: true,
                            })}
                        </div>
                        <div className="ml-auto font-medium text-slate-700 bg-slate-100 px-2 py-1 rounded">
                            {ticket.status_display}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
