"use client";

import { useState } from "react";
import { CirclePlus, Loader2, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { AddCategorySchema } from "@/types/admin/category";
import { addCategory } from "@/Server/Admin/category.admin.action";
import { toast } from "@/components/Reuseable/common/toast";
import { useRouter } from "next/navigation";


const AddCategories = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);


    const handleCategorySubmit = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();

        const form = e.currentTarget;
        const formData = new FormData(form);

        const categoryData = {
            name: formData.get("name"),
            slug: formData.get("slug"),
            description: formData.get("description"),
            icon: formData.get("icon"),
            backgroundImage: formData.get("backgroundImage"),
        };

        const validation = AddCategorySchema.safeParse(categoryData);
        if (!validation.success) {
            const errors = validation.error.flatten().fieldErrors;

            const firstError =
                Object.values(errors)?.flat()?.[0] ??
                "Invalid category data";

            toast.error(firstError);
            return;
        }
        try {
            setIsLoading(true);
            const response = await addCategory(formData);
            if (!response?.success) {
                toast.error(
                    response?.message ?? "Failed to add category"
                );
                return;
            }
            toast.success(response.message);
            form.reset();
            setIsOpen(false);
            router.refresh();
        } catch (error) {
            console.error("Add category error:", error);

            toast.error(
                "Something went wrong while adding category"
            );
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button className="lg:h-12 lg:text-lg font-semibold">
                    <Plus className="lg:size-6" />
                    Add Category
                </Button>
            </DialogTrigger>


            <DialogContent className="sm:max-w-sm md:max-w-2xl lg:max-w-3xl xl:max-w-4xl">

                <DialogHeader className="mb-6">
                    <DialogTitle className="flex items-center gap-2 text-primary text-xl font-bold">
                        Add Category
                        <CirclePlus />
                    </DialogTitle>

                    <DialogDescription>
                        Add a new category to the database.
                    </DialogDescription>
                </DialogHeader>


                <form
                    id="category-form"
                    onSubmit={handleCategorySubmit}
                >
                    <FieldGroup>

                        <Field>
                            <Label htmlFor="name">
                                Name
                            </Label>

                            <Input
                                id="name"
                                name="name"
                                type="text"
                                placeholder="Enter category name"
                                required
                            />
                        </Field>


                        <Field>
                            <Label htmlFor="slug">
                                Slug
                            </Label>

                            <Input
                                id="slug"
                                name="slug"
                                type="text"
                                placeholder="Enter category slug"
                                required
                            />
                        </Field>


                        <Field>
                            <Label htmlFor="description">
                                Description
                            </Label>

                            <Input
                                id="description"
                                name="description"
                                type="text"
                                placeholder="Enter category description"
                                required
                            />
                        </Field>


                        <Field>
                            <Label htmlFor="icon">
                                Icon
                            </Label>

                            <Input
                                id="icon"
                                name="icon"
                                type="file"
                                accept="image/*"
                                required
                            />
                        </Field>


                        <Field>
                            <Label htmlFor="backgroundImage">
                                Background Image
                            </Label>

                            <Input
                                id="backgroundImage"
                                name="backgroundImage"
                                type="file"
                                accept="image/*"
                                required
                            />
                        </Field>

                    </FieldGroup>
                </form>


                <DialogFooter>

                    <DialogClose asChild>
                        <Button
                            variant="outline"
                            disabled={isLoading}
                        >
                            Cancel
                        </Button>
                    </DialogClose>


                    <Button
                        type="submit"
                        form="category-form"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="size-4 animate-spin" />
                                Saving...
                            </>
                        ) : (
                            "Save changes"
                        )}
                    </Button>

                </DialogFooter>

            </DialogContent>
        </Dialog>
    );
};


export default AddCategories;