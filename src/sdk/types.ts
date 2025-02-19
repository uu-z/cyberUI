import type { ReactNode } from "react";

export interface EnumOption {
    label: string;
    value: string;
}

export interface FieldConfig<T = any> {
    required?: boolean;
    enum?: Array<string | EnumOption>;
    columns?: number;
    disabled?: boolean;
    readOnly?: boolean;
    placeholder?: string;
    gap?: string;
    onChange?: (value: T) => void;
    onClick?: (event: React.MouseEvent) => void;
    responsive?: boolean;
}

export type Config<T> = {
    [K in keyof T]?: FieldConfig<T[K]>;
};

export interface FieldProps<T = any> extends FieldConfig<T> {
    value: T;
    setState?: (value: T) => void;
}

export interface Widget {
    input?: (props: FieldProps) => ReactNode;
    select?: (props: FieldProps) => ReactNode;
    [key: string]: ((props: FieldProps) => ReactNode) | Record<string, (props?: any) => ReactNode> | undefined;
}
