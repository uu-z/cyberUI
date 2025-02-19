import type { ReactNode } from "react";

export interface FieldProps {
    value: any;
    onChange: (value: any) => void;
    required?: boolean;
    enum?: string[];
    [key: string]: any;
}

export interface Widget {
    input: (props: FieldProps) => ReactNode;
    select: (props: FieldProps) => ReactNode;
    [key: string]: (props: FieldProps) => ReactNode;
}
