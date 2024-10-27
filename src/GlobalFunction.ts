import { asFunction } from "./mixins/asFunction";
import { withAttributes } from "./mixins/withAttributes";
import { withComments } from "./mixins/withComments";
import { withName } from "./mixins/withName";

export class GlobalFunction extends asFunction(withName(withComments(withAttributes(class {})))) {

}