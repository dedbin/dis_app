"use client";
import axios from "axios";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
  } from "@/components/ui/dialog";

import {
    FormField,
    Form,
    FormControl,
    FormItem,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import qs from "query-string";
import { FileUpload } from "../file-upload";
import { useRouter } from "next/navigation";
import { useModal } from "@/hooks/use-modal-store";

  const formSchema = z.object({

      fileUrl: z.string().min(1, {
        message: "smth is required"
      })
  });
export const MessageFileModal = () => {
    const { isOpen, onClose, type, data } = useModal();
    const router = useRouter();
    const isModalOpen = isOpen && type === "messageFile";
    const {apiUrl, query} = data;  
const hanleClose = () => {
    form.reset();
    onClose();
}

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            fileUrl: "",
        },
    });

    const isLoading = form.formState.isSubmitting;
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const url = qs.stringifyUrl({
                url: apiUrl || "",
                query
            });
            await axios.post(url, {...values, content: values.fileUrl} );
            form.reset();
            router.refresh();
            hanleClose();
        } catch (e) {
            console.error(e);
        }
    }


    return ( 
        <Dialog open={isModalOpen} onOpenChange={hanleClose }>
            <DialogContent className="bg-white dark:bg-black p-0" overflow-hidden>
                    <DialogHeader className="pt-8 px-6">
                        <DialogTitle className="text-center text-2xl font-bold">
                            send a file as a message
                        </DialogTitle>
                    </DialogHeader>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <div className="space-y-8 px-6">
                                <div className="flex items-center justify-center text-center">
                                    <FormField
                                    control={form.control}
                                    name="fileUrl"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormControl>
                                                <FileUpload
                                                    endpoint="messageFile"
                                                    value={field.value}
                                                    onChange={field.onChange}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                    />
                                </div>
                                
                            </div>
                            <DialogFooter className="bg-black-100 px-6 py-4">
                                <Button
                                variant="primary"
                                type="submit"
                                disabled={isLoading}
                                >
                                    send
                                </Button>
                            </DialogFooter>
                        </form>
                    </Form>
            </DialogContent>
        </Dialog>
     )
}
 