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
import { useState } from "react";
import { useForm, type FieldValues, type SubmitHandler } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "react-router-dom";
import { useCreateBookMutation } from "@/redux/api/baseApi";
import Swal from "sweetalert2";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { cn } from "@/lib/utils";

const genres = [
  { label: "FICTION", value: "FICTION" },
  { label: "NON_FICTION", value: "NON_FICTION" },
  { label: "SCIENCE", value: "SCIENCE" },
  { label: "HISTORY", value: "HISTORY" },
  { label: "BIOGRAPHY", value: "BIOGRAPHY" },
  { label: "FANTASY", value: "FANTASY" },
] as const

const AddBooks = () => {
  const form = useForm();
  const navigate = useNavigate();
  const [openAddBookModal, setOpenAddBookModal] = useState(false);

  const [createBookInfo, { isLoading }] = useCreateBookMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {

     
    try {
      await createBookInfo(data).unwrap();
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Book successfully added",
        showConfirmButton: false,
        timer: 1500,
      });
      setOpenAddBookModal(false);
      // form.reset();
      navigate("/");
    } catch (error) {
      Swal.fire({
        title: "Oops...",
        text: "Something went wrong while adding the book.",
        icon: "error",
      });
      console.error("Add book failed:", error);
    }
  };

  return (
    <Dialog open={openAddBookModal} onOpenChange={setOpenAddBookModal}>
      <DialogTrigger asChild>

          <button className="hover:bg-[#d8f0fd] border-2 border-transparent hover:border-[#389acf] transition-all text-[#389acf] font-semibold py-1 px-3 rounded-md">Add Book</button>
          {/* <Button variant="outline">Add Book</Button> */}

      </DialogTrigger>

      <DialogContent className="lg:max-w-[700px] md:max-w-[600px] max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add new book information</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              {/* Title */}
              <div className="">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input {...field} required value={field.value || ""} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              {/* Author */}
              <div className="">
                <FormField
                  control={form.control}
                  name="author"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Author</FormLabel>
                      <FormControl>
                        <Input {...field} required value={field.value || ""} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {/* Genre */}
              <div className="">
                <FormField
                  control={form.control}
                  name="genre"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Genre</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              role="combobox"
                              className={cn(
                                " justify-between",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value
                                ? genres.find(
                                    (genre) => genre.value === field.value
                                  )?.label
                                : "Select Genre"}
                              <ChevronsUpDown className="opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-[200px] p-0">
                          <Command>
                            <CommandInput
                              placeholder="Search framework..."
                              className="h-9"
                            />
                            <CommandList>
                              <CommandEmpty>No framework found.</CommandEmpty>
                              <CommandGroup>
                                {genres.map((genre) => (
                                  <CommandItem
                                    value={genre.label}
                                    key={genre.value}
                                    onSelect={() => {
                                      form.setValue("genre", genre.value);
                                    }}
                                  >
                                    {genre.label}
                                    <Check
                                      className={cn(
                                        "ml-auto",
                                        genre.value === field.value
                                          ? "opacity-100"
                                          : "opacity-0"
                                      )}
                                    />
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              {/* ISBN */}
              <div className="">
                <FormField
                  control={form.control}
                  name="isbn"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>ISBN</FormLabel>
                      <FormControl>
                        <Input {...field} required value={field.value || ""} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            {/* Description */}
            <div>
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="A brief description of the book"
                        required
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* Copies */}
              <div className="">
                <FormField
                  control={form.control}
                  name="copies"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Copies</FormLabel>
                      <FormControl>
                        <Input {...field} required value={field.value || ""} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              {/* Available */}
              <div className="">
                <FormField
                  control={form.control}
                  name="available"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Available</FormLabel>
                      <FormControl>
                        <Input {...field} value={field.value || ""} />
                      </FormControl>
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
                {isLoading ? "Adding..." : "Add Book"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddBooks;
