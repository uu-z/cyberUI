import type { ReactNode } from "react";

export interface FieldProps {
    value: any;
    onChange: (value: any, field?: string) => void;
    onClick?: (event: any) => void;
    required?: boolean;
    enum?: Array<string | { value: string; label: string }>;
    columns?: number;
    [key: string]: any;
}

export interface Widget {
    input?: (props: FieldProps) => ReactNode;
    select?: (props: FieldProps) => ReactNode;
    [key: string]: ((props: FieldProps) => ReactNode) | Record<string, (props?: any) => ReactNode> | undefined;
}
