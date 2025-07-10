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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CiEdit } from "react-icons/ci";
import { Textarea } from "../ui/textarea";
import { useState } from "react";
import { useUpdateBookMutation } from "@/redux/api/baseApi";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { Book } from "@/interface/book.interface";

export function EditBook({ book }: { book: Book }) {
  const [openEditBookModal, setOpenEditBookModal] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    genre: "",
    isbn: "",
    description: "",
    copies: "",
  });

  const [updateBook, { isLoading }] = useUpdateBookMutation();

  const handleEditBook = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    console.log(name, value);
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    const newInfoOfBook = {
      title: formData.title === "" ? book.title : formData.title,
      author: formData.author === "" ? book.author : formData.author,
      genre: formData.genre === "" ? book.genre : formData.genre,
      isbn: formData.isbn === "" ? book.isbn : formData.isbn,
      description:
        formData.description === "" ? book.description : formData.description,
      copies: formData.copies === "" ? book.copies : formData.copies,
      available:
        formData?.copies === ""
          ? book.available
          : formData?.copies === "0"
          ? false
          : true,
    };

    try {
      await updateBook({
        id: book._id,
        updateBookInfo: newInfoOfBook,
      })
        .unwrap()
        .then((res) => {
          if (res.success) {
            alert("Book successfully updated");
          } else {
            alert("Failed to update book");
          }
        });
    } catch (err) {
      console.error("Update failed", err);
    }
  };
  return (
    <Dialog open={openEditBookModal} onOpenChange={setOpenEditBookModal}>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <DialogTrigger asChild>
              <CiEdit className="lg:text-2xl md:text-xl text-sm "></CiEdit>
            </DialogTrigger>
          </TooltipTrigger>
          <TooltipContent>
            <p>Edit book information</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      

      <DialogContent className="lg:max-w-[700px] md:max-w-[600px] max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit '{book.title}' book</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="grid gap-3">
              <Label htmlFor="name-1">Title</Label>
              <Input
                id="title"
                name="title"
                defaultValue={book.title}
                onChange={handleEditBook}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="username-1">Author</Label>
              <Input
                id="author"
                name="author"
                defaultValue={book.author}
                onChange={handleEditBook}
              />
            </div>
          </div>
          <div className="grid grid-cols-6 gap-2">
            <div className="grid gap-3 col-span-2">
              <Label htmlFor="name-1">Genre</Label>
              <Input
                id="genre"
                name="genre"
                defaultValue={book.genre}
                onChange={handleEditBook}
              />
            </div>
            <div className="grid gap-3 col-span-3">
              <Label htmlFor="username-1">ISBN</Label>
              <Input
                id="isbn"
                name="isbn"
                defaultValue={book.isbn}
                onChange={handleEditBook}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="name-1">Copies</Label>
              <Input
                id="copies"
                name="copies"
                defaultValue={book.copies}
                onChange={handleEditBook}
              />
            </div>
          </div>
          <div className="grid gap-3">
            <Label htmlFor="username-1">Description</Label>
            <Textarea
              name="description"
              placeholder={book.description}
              onChange={handleEditBook}
            />
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" type="button">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Updating..." : "Update Book"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
