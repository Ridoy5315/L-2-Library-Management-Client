import borrowBooksIcon from "../../assets/image.png";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "../ui/calendar";
import { useForm, type FieldValues, type SubmitHandler } from "react-hook-form";
import { useCreateBorrowBookMutation } from "@/redux/api/baseApi";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

interface Book {
  _id: string;
  title: string;
}

interface BorrowBookProps {
  book: Book;
}

export default function BorrowBook({ book }: BorrowBookProps) {
  const form = useForm();
  const navigate = useNavigate();
  const [openBorrowBookModal, setOpenBorrowBookModal] = useState(false);

  const [createBorrowBook, { isLoading }] = useCreateBorrowBookMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const borrowBookInfo = {
      book: book._id,
      ...data,
    };
    console.log(borrowBookInfo);
    try {
      await createBorrowBook(borrowBookInfo).unwrap();
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Book successfully borrowed",
        showConfirmButton: false,
        timer: 1500,
      });
      form.reset();
      setOpenBorrowBookModal(false);
      navigate("/borrow-Summary");
    } catch (error) {
      Swal.fire({
        title: "Oops...",
        text: "Something went wrong while borrowing the book.",
        icon: "error",
      });

      console.error("Borrow failed:", error);
    }
  };

  return (
    <Dialog open={openBorrowBookModal} onOpenChange={setOpenBorrowBookModal}>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <DialogTrigger asChild>
              <img
                className="lg:w-7 md:w-6 w-4 cursor-pointer"
                src={borrowBooksIcon}
                alt=""
              />
            </DialogTrigger>
          </TooltipTrigger>
          <TooltipContent>
            <p>Borrow this book</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <DialogContent className="lg:max-w-[600px] md:max-w-[600px] max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-center">Borrow '{book.title}' book</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="flex items-center justify-evenly gap-4">
              <div className="grid gap-3">
                <FormField
                  control={form.control}
                  name="quantity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Quantity</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="quantity" value={field.value || ""} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Due date */}
              <div>
                <FormField
                  control={form.control}
                  name="dueDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Due Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-[240px] pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a due date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            captionLayout="dropdown"
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline" type="button">
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Borrowing..." : "Borrow Book"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
