"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useEffect, useState } from "react";
import { Camera } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RootState } from "@/lib/store";
import toast from "react-hot-toast";
import axios from "axios";
import { setUser } from "@/lib/features/auth/authSlice";

export default function Profile() {
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();
  const [avatar, setAvatar] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event?.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setAvatar(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const FormSchema = z.object({
    fullname: z.string().min(2, {
      message: "Fullname is required",
    }),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      fullname: user?.fullname || "",
    },
  });

  useEffect(() => {
    if (user) {
      form.reset({
        fullname: user.fullname,
      });
    }
  }, [user]);

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setLoading(true);
    try {
      const { fullname } = data;

      const response = await axios.put("/api/user", {
        fullname,
        profileImage: avatar,
      });

      if (response.data.success) {
        dispatch(setUser(response.data.user));
        return toast.success("Profile updated successfully!");
      }

      toast.error(response.data.message || "Profile not updated successfully");
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || error.message || "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card x-chunk="dashboard-04-chunk-1">
      <CardHeader>
        <CardTitle className="text-xl md:text-2xl">Profile</CardTitle>
        <CardDescription>
          Update your profile information here to keep your account details
          current. You can edit your name and profile picture.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-col items-center space-y-4">
              <Avatar className="md:w-[250px] md:h-[250px] h-32 w-32">
                <AvatarImage
                  src={avatar || user?.profileImage || ""}
                  alt={user?.fullname || "User Avatar"}
                />
                <AvatarFallback>
                  {user?.fullname
                    .split(" ")
                    .map((n: string) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="relative">
                <Label
                  htmlFor="avatar-upload"
                  className="cursor-pointer inline-block"
                >
                  <Input
                    type="file"
                    id="avatar-upload"
                    className="sr-only"
                    accept="image/*"
                    onChange={handleAvatarChange}
                  />
                  <Button asChild type="button" variant="outline" size="sm">
                    <span>
                      <Camera className="w-4 h-4 mr-2" />
                      Change Avatar
                    </span>
                  </Button>
                </Label>
              </div>

              <div className="mx-auto w-full max-w-screen-sm gap-[20px] flex flex-col">
                <FormField
                  control={form.control}
                  name="fullname"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input
                          defaultValue={user?.fullname}
                          id="fullname"
                          placeholder="Your full name"
                          className="mt-1"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="w-full">
                  <Label>Email</Label>
                  <Input
                    disabled={true}
                    readOnly={true}
                    type="email"
                    value={user?.email}
                    placeholder="Your email address"
                    className="mt-1"
                  />
                </div>

                <div>
                  <Button type="submit" disabled={loading}>
                    {loading ? "Saving..." : "Save"}
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
