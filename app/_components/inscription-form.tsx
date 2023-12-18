"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  inscription: z.string().min(2, {
    message: "Inscription must be at least 2 characters.",
  }),
});
const InscriptionForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      inscription: "",
    },
  });

  // TODO: Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }
  return (
    <div>
      <div className="mb-1 text-lg font-medium tracking-tight">
        Inscription:
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="inscription"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder='data:, {"p":"asc-20","op":"mint","tick":"aval","amt":"1000000"}'
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  ⚠️ Make sure to fill a correct inscription.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
};

export default InscriptionForm;
