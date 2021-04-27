import { defineComponent } from "@vue/runtime-core";
import NumberField from "./fields/NumberField";
import StringField from "./fields/StringField.vue";
import { FiledPropsDefine, Schema, SchemaTypes } from "./types";

export default defineComponent({
  name: "SchemaItem",
  props: FiledPropsDefine,
  setup(props) {
    return () => {
      const { schema } = props;
      const { type } = schema;
      // TODO: 如果type没有指定，我们需要猜测这个type
      let Component: any;
      switch (type) {
        case SchemaTypes.STRING:
          Component = StringField;
          break;
        case SchemaTypes.NUMBER:
          Component = NumberField;
          break;
        default: {
          console.log(`${type} is not supported`);
        }
      }
      return <Component {...props}></Component>;
    };
  },
});
