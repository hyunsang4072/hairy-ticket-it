// import React from "react";
import { X, CheckCircle, Play, Archive } from "lucide-react";
import api from "../api";
import type { Ticket } from "../types";

interface Props {
    ticket: Ticket;
    onClose: () => void;
    onUpdate: () => void;
}

export default function TicketDetailModal({
    ticket,
    onClose,
    onUpdate,
}: Props) {
    const updateStatus = async (newStatus: string) => {
        try {
            await api.patch(`/tickets/${ticket.id}/`, { status: newStatus });
            onUpdate(); // Refresh the list
            onClose(); // Close the modal
        } catch (error) {
            console.error("Failed to update ticket:", error);
        }
    };

    return (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden border border-slate-200">
                {/* Modal Header */}
                <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                    <span className="text-xs font-bold tracking-wider text-slate-400 uppercase">
                        Ticket Details
                    </span>
                    <button
                        onClick={onClose}
                        className="p-1 hover:bg-slate-200 rounded-full transition-colors">
                        <X size={20} className="text-slate-500" />
                    </button>
                </div>

                {/* Modal Content */}
                <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                        <h2 className="text-2xl font-bold text-slate-900 leading-tight">
                            {ticket.title}
                        </h2>
                    </div>

                    <div className="flex gap-2 mb-6">
                        <span className="px-2 py-1 rounded-md bg-slate-100 text-slate-600 text-xs font-semibold uppercase tracking-wide">
                            {ticket.category_display}
                        </span>
                        <span
                            className={`px-2 py-1 rounded-md text-xs font-semibold uppercase tracking-wide border ${
                                ticket.priority === "CRITICAL"
                                    ? "bg-red-50 border-red-100 text-red-700"
                                    : "bg-blue-50 border-blue-100 text-blue-700"
                            }`}>
                            {ticket.priority_display} Priority
                        </span>
                    </div>

                    <div className="bg-slate-50 p-4 rounded-xl mb-6">
                        <p className="text-slate-700 whitespace-pre-wrap leading-relaxed">
                            {ticket.description}
                        </p>
                    </div>

                    <div className="text-sm text-slate-500 mb-8 space-y-1">
                        <p>
                            <strong>Submitted by:</strong>{" "}
                            {ticket.submitter_email}
                        </p>
                        <p>
                            <strong>Current Status:</strong>{" "}
                            <span className="text-blue-600 font-medium">
                                {ticket.status_display}
                            </span>
                        </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="grid grid-cols-3 gap-3">
                        <button
                            onClick={() => updateStatus("IN_PROGRESS")}
                            className="flex items-center justify-center gap-2 py-2.5 rounded-lg border border-blue-200 text-blue-700 hover:bg-blue-50 font-medium transition-colors">
                            <Play size={16} /> In Progress
                        </button>
                        <button
                            onClick={() => updateStatus("RESOLVED")}
                            className="flex items-center justify-center gap-2 py-2.5 rounded-lg bg-green-600 text-white hover:bg-green-700 font-medium transition-colors">
                            <CheckCircle size={16} /> Resolve
                        </button>
                        <button
                            onClick={() => updateStatus("CLOSED")}
                            className="flex items-center justify-center gap-2 py-2.5 rounded-lg bg-slate-800 text-white hover:bg-slate-900 font-medium transition-colors">
                            <Archive size={16} /> Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
