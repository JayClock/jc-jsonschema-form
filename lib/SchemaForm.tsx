import { defineComponent, PropType } from "@vue/runtime-core";
import { FiledPropsDefine, Schema } from "./types";
import SchemaItem from "./SchemaItem";

export default defineComponent({
  name: "SchemaForm",
  props: FiledPropsDefine,
  setup(props) {
    const handleChange = (v: any) => {
      props.onChange(v);
    };
    return () => {
      const { schema, value } = props;
      return (
        <SchemaItem
          schema={schema}
          value={value}
          onChange={handleChange}
        ></SchemaItem>
      );
    };
  },
});
