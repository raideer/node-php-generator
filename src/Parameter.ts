import { withAttributes } from "mixins/withAttributes";
import { withComments } from "mixins/withComments";
import { withName } from "mixins/withName";

export class Parameter extends withName(withComments(withAttributes(class {}))) {
    private reference = false;
    private type: string | null = null;
    private nullable = false;
    private _hasDefaultValue = false;
    private defaultValue: any;

    setReference(reference: boolean): this {
        this.reference = reference;

        return this;
    }

    isReference(): boolean {
        return this.reference;
    }

    setType(type: string | null): this {
        this.type = type;

        return this;
    }

    getType(): string | null {
        return this.type;
    }

    setNullable(nullable: boolean): this {
        this.nullable = nullable;

        return this;
    }

    isNullable(): boolean {
        return this.nullable || (this._hasDefaultValue && this.defaultValue === null);
    }

    setDefaultValue(defaultValue: any): this {
        this._hasDefaultValue = true;
        this.defaultValue = defaultValue;

        return this;
    }

    getDefaultValue(): any {
        return this.defaultValue;
    }

    hasDefaultValue(): boolean {
        return this._hasDefaultValue;
    }
}