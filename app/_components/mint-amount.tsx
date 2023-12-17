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
  amount: z.string().max(10, {
    message: "amount must be at least 2 characters.",
  }),
});

const MintAmount = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: "",
    },
  });

  // TODO: Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }
  return (
    <div>
      <div className="mb-1 text-lg font-medium tracking-tight">
        Mint amount:
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="1" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
};

export default MintAmount;
