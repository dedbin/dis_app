"use client";
import axios from "axios";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog";

import {
    FormField,
    Form,
    FormControl,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { FileUpload } from "../file-upload";
import { useRouter } from "next/navigation";

  const formSchema = z.object({
      name: z.string().min(1, { 
        message: "Server name is required" 
      }),
      logoUrl: z.string().min(1, {
        message: "Server logo is required"
      })
  });
export const InitialModal = () => {
    const [isMounted, setIsMounted] = useState(false);
    const router = useRouter();

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            logoUrl: "",
        },
    });

    const isLoading = form.formState.isSubmitting;
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await axios.post("/api/servers", values);
            form.reset();
            router.refresh();
            window.location.reload();
        } catch (e) {
            console.error(e);
        }
    }

    if (!isMounted) {
        return null;
    }

    return ( 
        <Dialog open>
            <DialogContent className="bg-white bg-black p-0" overflow-hidden>
                    <DialogHeader className="pt-8 px-6">
                        <DialogTitle className="text-center text-2xl font-bold">
                            Customize your server
                        </DialogTitle>
                        <DialogDescription className="text-center text-zinc-400">
                           Give your server a personality with a name and a logo. You can change these later.
                        </DialogDescription>
                    </DialogHeader>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <div className="space-y-8 px-6">
                                <div className="flex items-center justify-center text-center">
                                    <FormField
                                    control={form.control}
                                    name="logoUrl"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormControl>
                                                <FileUpload
                                                    endpoint="serverImage"
                                                    value={field.value}
                                                    onChange={field.onChange}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                    />
                                </div>
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel
                                            className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/82"
                                            >
                                                Server name
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                disabled={isLoading}
                                                className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible: ring-offset-0"
                                                placeholder="Enter server name"
                                                {...field}
                                                />
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <DialogFooter className="bg-black-100 px-6 py-4">
                                <Button
                                variant="primary"
                                type="submit"
                                disabled={isLoading}
                                >
                                    Create
                                </Button>
                            </DialogFooter>
                        </form>
                    </Form>
            </DialogContent>
        </Dialog>
     );
}
 
export default InitialModal;