import { useCallback } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { Button, StyleSheet, Text, View } from "react-native";
import { FormTextInput } from "./componenets/FormTextInput";
import { FormDatePickerInput } from "./componenets/FormDatePickerInput";
import { FormDropDown } from "./componenets/FormDropDown";
import { FormItem } from "./types/form-item";
import { FormTagGroup } from "./componenets/FormTagGroup";

export interface ExampleFormData {
  title?: string;
  eventType?: string;
  startDate?: string;
  endDate?: string;
  eventType1?: string;
  eventType2: string;
}

export const eventTypeFormData: FormItem[] = [
  { id: 0, name: "Birthday", value: "BIRTHDAY" },
  { id: 1, name: "Walk", value: "WALK" },
  { id: 2, name: "Hike", value: "HIKE" },
  { id: 3, name: "Gathering", value: "GATHERING" },
];

export default function App() {
  const form = useForm<ExampleFormData>({
    defaultValues: {},
  });

  const onSubmit = useCallback(() => {
    const data = form.getValues();
    console.log(data);
  }, [form]);

  return (
    <FormProvider {...form}>
      <View style={styles.container}>
        <FormTextInput name="title" title="Enter Title" />
        <FormDropDown
          title="Event Type"
          name="eventType"
          placeholder="Select an option"
          data={eventTypeFormData.map((item) => {
            return { label: item.name, value: item.value };
          })}
        />
        <View style={{ flexDirection: "row", columnGap: 24 }}>
          <FormDatePickerInput
            style={{ flex: 1 }}
            name="startDate"
            title="Start Date"
            placeholder="../../.."
          />
          <FormDatePickerInput
            style={{ flex: 1 }}
            name="endDate"
            title="End Date"
            placeholder="../../.."
          />
        </View>
        <Text>Here you can select only one Card</Text>
        <FormTagGroup
          flexTags
          name="eventType1"
          data={eventTypeFormData}
          min={1}
          max={1}
        />
        <Text>Here you can select multiple Cards</Text>
        <FormTagGroup
          flexTags
          name="eventType2"
          data={eventTypeFormData}
          min={0}
        />
        <Button
          onPress={form.handleSubmit(
            onSubmit as SubmitHandler<ExampleFormData>
          )}
          title="Continue"
        />
      </View>
    </FormProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 24,
    justifyContent: "center",
    rowGap: 20,
  },
});
