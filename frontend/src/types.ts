export interface Ticket {
    id: number;
    title: string;
    description: string;
    submitter_email: string;
    status: string;
    priority: string;
    category: string;
    status_display: string;
    priority_display: string;
    category_display: string;
    created_at: string;
    updated_at: string;
}
