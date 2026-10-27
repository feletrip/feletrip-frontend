/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  BadgeCheck,
  ChevronRight,
  LogOut,
  Menu,
  Phone,
  Shield,
} from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { motion } from "framer-motion";

import { ThemeToggle } from "@/components/modules/theme/ThemeToggle";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import RegisterForm from "@/components/auth/Form/RegisterForm";
import LoginForm from "@/components/auth/Form/LoginForm";
import { useIsMobile } from "@/hooks/use-mobile";
import ResetPasswordClient from "@/components/auth/Form/reset-password-client";
import VerifyEmailClient from "@/components/auth/Form/verify-email-client";
import { Container } from "./Container";
import { useAuth } from "@/providers/authProvider";
import { logoutAction } from "@/Server/Auth/auth.actions";
import { toast } from "@/components/Reuseable/common/toast";
import Image from "next/image";
import VendorReg from "@/components/auth/Form/VendorReg";
import { useChatStore } from "@/lib/chat.store";
import FeleTripLogo from "@/components/shared/FeleTripLogo";

interface MenuItem {
  title: string;
  url: string;
  description?: string;
  icon?: React.ReactNode;
  items?: MenuItem[];
}

interface NavbarProps {
  className?: string;
  logo?: LogoProps;
  menu?: MenuItem[];
  auth?: AuthProps;
}

interface LogoProps {
  url: string;
  src: string;
  alt: string;
  title?: string;
  className?: string;
}

interface AuthProps {
  login: { title: string; url: string };
  signup: { title: string; url: string };
}

const defaultMenu: MenuItem[] = [
  { title: "Home", url: "/" },
  { title: "About", url: "/about" },
  { title: "Contact", url: "/contact" },
  { title: "Blogs", url: "/blogs" },
];

const Navbar = ({ menu = defaultMenu }: NavbarProps) => {
  const [scrolled, setScrolled] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [authView, setAuthView] = useState<
    "login" | "register" | "reset" | "verify"
  >("login");

  const { user, setUser } = useAuth();
  const isLoggedIn = !!user;
  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogOut = async () => {
    try {
      toast.loading("Logging out...", "Please wait while we sign you out");

      const result = await logoutAction();

      toast.close();

      if (!result.success) {
        toast.error("Logout failed", result.message || "Something went wrong");
        return;
      }

      setUser(null);

      toast.success(
        "Logged out successfully",
        "We'll miss you. See you on your next adventure!",
      );
      useChatStore.getState().reset();
    } catch (error: any) {
      toast.close();

      toast.error(
        "Logout failed",
        error?.message || "Server Error. Please try again later",
      );
    }
  };

  return (
    <motion.section
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className={clsx(
        "fixed left-1/2 -translate-x-1/2 z-50 transition-all duration-500 w-full",
        scrolled ? "top-4 container px-4" : "top-0 max-w-full",
      )}
    >
      <section
        className={clsx(
          "transition-all duration-500 flex justify-center w-full",
          scrolled
            ? "rounded-xl bg-background/60 backdrop-blur-sm shadow-[0_0_25px_rgba(0,0,0,0.2)]"
            : "bg-background/80",
        )}
      >
        <Container className={`${scrolled && "px-3!"}`}>
          <div className="w-full">
            <DesktopMenu
              menu={menu}
              scrolled={scrolled}
              authView={authView}
              setAuthView={setAuthView}
              userEmail={userEmail}
              setUserEmail={setUserEmail}
              isLoggedIn={isLoggedIn}
              user={user}
              handleLogOut={handleLogOut}
            />

            <MobileMenu
              menu={menu}
              authView={authView}
              setAuthView={setAuthView}
              userEmail={userEmail}
              setUserEmail={setUserEmail}
              isLoggedIn={isLoggedIn}
              user={user}
              handleLogOut={handleLogOut}
            />
          </div>
        </Container>
      </section>
    </motion.section>
  );
};

// ====================== Desktop Menu ======================
const DesktopMenu = ({
  menu,
  authView,
  setAuthView,
  userEmail,
  setUserEmail,
  isLoggedIn,
  user,
  handleLogOut,
}: any) => {
  return (
    <nav className="hidden items-center justify-between lg:flex">
      <FeleTripLogo />

      <div className="flex items-center gap-6">
        <div className="relative flex items-center gap-6 bg-primary py-3 px-6 clip-path-custom before:content-[''] before:absolute before:top-0 before:-left-9.75 before:h-full before:w-10 before:bg-primary before:[clip-path:polygon(100%_0,100%_100%,0_100%)]">
          <NavigationMenu>
            <NavigationMenuList>
              {menu.map((item: MenuItem) => (
                <DesktopMenuItem key={item.title} item={item} />
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <AuthButtons
          isLoggedIn={isLoggedIn}
          user={user}
          handleLogOut={handleLogOut}
          authView={authView}
          setAuthView={setAuthView}
          userEmail={userEmail}
          setUserEmail={setUserEmail}
        />
      </div>
    </nav>
  );
};

// ====================== Auth ======================
const AuthButtons = ({
  authView,
  setAuthView,
  userEmail,
  setUserEmail,
  isLoggedIn,
  user,
  handleLogOut,
}: any) => {
  const isMobile = useIsMobile();
  return (
    <div className="flex flex-col lg:flex-row lg:items-center gap-4">
      {user ? (
        <Button className="bg-primary lg:bg-background/20 border w-fit">
          <Link
            href={`/dashboard/${user?.role?.panel?.toLowerCase()}`}
            className="text-sm font-semibold text-background lg:text-foreground"
          >
            Dashboard
          </Link>
        </Button>
      ) : (
        <div className="flex items-center justify-center">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                onClick={() => setAuthView("register")}
                className="bg-background/20! border! w-fit text-sm! text-foreground!"
              >
                Business Registration
              </Button>
            </SheetTrigger>

            <ScrollArea className="grow">
              <SheetContent
                side={isMobile ? "bottom" : "right"}
                className="px-4 w-full sm:w-sm h-11/12 sm:h-screen overflow-auto hide-scrollbar"
              >
                <SheetHeader>
                  {/* logo */}
                  <div className="relative w-20 h-20 aspect-square mx-auto mt-6">
                    <Image src="/logo.png" alt="FeleTrip" fill priority />
                  </div>

                  <SheetTitle asChild>
                    <motion.div
                      initial={{ y: -20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.3, delay: 0.3 }}
                      className="text-center mt-6"
                    >
                      <motion.div
                        key={authView}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                      >
                        {authView === "register" && (
                          <>
                            <p className="text-sm text-foreground/60">
                              Are you a hotel owner?
                            </p>
                          </>
                        )}

                        <motion.h3
                          key={authView}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.5 }}
                          className="text-2xl font-bold mt-2"
                        >
                          {authView === "login" && (
                            <>
                              Welcome <span className="text-primary">Back</span>
                            </>
                          )}
                          {authView === "register" && (
                            <>
                              Register Your{" "}
                              <span className="text-primary">Business</span>
                            </>
                          )}
                          {authView === "reset" && (
                            <>
                              Reset{" "}
                              <span className="text-primary">Password</span>
                            </>
                          )}
                          {authView === "verify" && (
                            <>
                              Verify <span className="text-primary">Email</span>
                            </>
                          )}
                        </motion.h3>
                      </motion.div>
                    </motion.div>
                  </SheetTitle>
                </SheetHeader>

                {/* Form Fields */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                  className="px-4 pb-4 w-full"
                >
                  {/* login form */}
                  {authView === "login" && (
                    <motion.aside
                      key={authView}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <LoginForm
                        setAuthView={setAuthView}
                        userEmail={userEmail}
                        setUserEmail={setUserEmail}
                      />
                    </motion.aside>
                  )}
                  {/* register form */}
                  {authView === "register" && (
                    <motion.aside
                      key={authView}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <VendorReg
                        setAuthView={setAuthView}
                        setUserEmail={setUserEmail}
                      />
                    </motion.aside>
                  )}

                  {/* reset password form */}
                  {authView === "reset" && (
                    <motion.aside
                      key={authView}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ResetPasswordClient />
                    </motion.aside>
                  )}

                  {/* verify email form */}
                  {authView === "verify" && (
                    <motion.aside
                      key={authView}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <VerifyEmailClient
                        setAuthView={setAuthView}
                        userEmail={userEmail}
                      />
                    </motion.aside>
                  )}
                </motion.div>
              </SheetContent>
            </ScrollArea>
          </Sheet>
        </div>
      )}

      <div className="flex items-center gap-4">
        <ThemeToggle />
        {!isLoggedIn ? (
          <>
            {/* customer signin/register */}
            <div className="flex items-center justify-center">
              <Sheet>
                <SheetTrigger asChild>
                  <Button
                    onClick={() => setAuthView("login")}
                    className="text-xs!"
                  >
                    LOGIN / REGISTER
                  </Button>
                </SheetTrigger>

                <ScrollArea className="grow">
                  <SheetContent
                    side={isMobile ? "bottom" : "right"}
                    className="px-4 w-full sm:w-sm h-11/12 sm:h-screen overflow-auto hide-scrollbar"
                  >
                    <SheetHeader>
                      {/* logo */}
                      <div className="relative w-20 h-20 aspect-square mx-auto mt-6">
                        <Image src="/logo.png" alt="FeleTrip" fill priority />
                      </div>

                      <SheetTitle asChild>
                        <motion.div
                          initial={{ y: -20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ duration: 0.3, delay: 0.3 }}
                          className="text-center mt-6"
                        >
                          <motion.h3
                            key={authView}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5 }}
                            className="text-3xl font-bold"
                          >
                            {authView === "login" && (
                              <>
                                Welcome{" "}
                                <span className="text-primary">Back</span>
                              </>
                            )}
                            {authView === "register" && (
                              <>
                                Create{" "}
                                <span className="text-primary">Account</span>
                              </>
                            )}
                            {authView === "reset" && (
                              <>
                                Reset{" "}
                                <span className="text-primary">Password</span>
                              </>
                            )}
                            {authView === "verify" && (
                              <>
                                Verify{" "}
                                <span className="text-primary">Email</span>
                              </>
                            )}
                          </motion.h3>
                        </motion.div>
                      </SheetTitle>

                      <motion.div
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.4, delay: 0.6 }}
                        className="bg-foreground/5 p-1 mt-6 rounded-md text-sm font-semibold grid grid-cols-2 gap-1"
                      >
                        <button
                          className={`px-6 py-1 rounded-sm transition-all duration-500 cursor-pointer
                      ${authView === "login" ? "bg-primary text-primary-foreground" : "hover:bg-background"}
                      ${authView !== "login" && authView !== "register" && "bg-background"}`}
                          onClick={() => setAuthView("login")}
                        >
                          Login
                        </button>
                        <button
                          className={`px-6 py-1 rounded-sm transition-all duration-500 cursor-pointer
                      ${authView === "register" ? "bg-primary text-primary-foreground" : "hover:bg-background"}
                      ${authView !== "login" && authView !== "register" && "bg-background"}`}
                          onClick={() => setAuthView("register")}
                        >
                          Register
                        </button>
                      </motion.div>
                    </SheetHeader>

                    {/* Form Fields */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.8 }}
                      className="px-4 pb-4 w-full"
                    >
                      {/* login form */}
                      {authView === "login" && (
                        <motion.aside
                          key={authView}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ duration: 0.3 }}
                        >
                          <LoginForm
                            setAuthView={setAuthView}
                            userEmail={userEmail}
                            setUserEmail={setUserEmail}
                          />
                        </motion.aside>
                      )}
                      {/* register form */}
                      {authView === "register" && (
                        <motion.aside
                          key={authView}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 20 }}
                          transition={{ duration: 0.3 }}
                        >
                          <RegisterForm
                            setAuthView={setAuthView}
                            setUserEmail={setUserEmail}
                          />
                        </motion.aside>
                      )}

                      {/* reset password form */}
                      {authView === "reset" && (
                        <motion.aside
                          key={authView}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <ResetPasswordClient
                          // authView={authView}
                          // setAuthView={setAuthView}
                          />
                        </motion.aside>
                      )}

                      {/* verify email form */}
                      {authView === "verify" && (
                        <motion.aside
                          key={authView}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <VerifyEmailClient
                            setAuthView={setAuthView}
                            userEmail={userEmail}
                          />
                        </motion.aside>
                      )}
                    </motion.div>
                  </SheetContent>
                </ScrollArea>
              </Sheet>
            </div>
          </>
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="rounded-full cursor-pointer">
                <Avatar>
                  <AvatarImage src={user?.avatar} alt={user?.name || "User"} />

                  <AvatarFallback className="font-semibold">
                    {user?.name?.charAt(0).toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>
              </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              align="end"
              className="w-72 rounded-xl border bg-background p-4 shadow-xl"
            >
              {/* Header */}
              <Link
                href={`/dashboard/${user?.role?.panel?.toLowerCase()}/profile`}
                className="group mb-4 flex items-center justify-between gap-4 rounded-xl border border-border/50 bg-foreground/3 p-3 transition-all hover:border-primary/20 hover:bg-foreground/5"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <Avatar className="h-11 w-11 border">
                    <AvatarImage
                      src={user?.avatar}
                      alt={user?.name || "User"}
                    />

                    <AvatarFallback className="font-semibold">
                      {user?.name?.charAt(0).toUpperCase() || "U"}
                    </AvatarFallback>
                  </Avatar>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1">
                      <p className="truncate text-sm font-semibold">
                        {user?.name}
                      </p>
                      {user?.isVerified && (
                        <div className="bg-primary text-primary-foreground rounded-full">
                          <BadgeCheck className="h-3 w-3" />
                        </div>
                      )}
                    </div>

                    <p className="truncate text-xs text-muted-foreground">
                      {user?.email}
                    </p>
                  </div>
                </div>

                <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground transition-all group-hover:translate-x-1 group-hover:text-foreground" />
              </Link>

              {/* Info */}
              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-muted-foreground">
                    <Phone className="h-3.5 w-3.5" />
                    Phone
                  </span>

                  <span className="font-medium">{user?.phone}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-muted-foreground">
                    <Shield className="h-3.5 w-3.5" />
                    Role
                  </span>

                  <span className="font-medium">{user?.role?.name}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-4 border-t pt-3">
                <button
                  onClick={handleLogOut}
                  className="flex w-full items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-red-500 transition-all hover:bg-red-500/10"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </button>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </div>
  );
};

// ====================== Desktop Menu Item ======================
const DesktopMenuItem = ({ item }: { item: MenuItem }) => {
  const pathname = usePathname();
  const isActive = pathname === item.url;

  if (item.items) {
    return (
      <NavigationMenuItem>
        <NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>
        <NavigationMenuContent>
          {item.items.map((subItem) => (
            <NavigationMenuLink asChild key={subItem.title}>
              <SubMenuLink item={subItem} />
            </NavigationMenuLink>
          ))}
        </NavigationMenuContent>
      </NavigationMenuItem>
    );
  }

  return (
    <NavigationMenuItem>
      <NavigationMenuLink asChild>
        <Link
          href={item.url}
          className={clsx(
            "group/nav relative px-3 py-2 uppercase font-medium text-background transition-all duration-300 hover:bg-background/10 hover:text-background focus:bg-transparent focus:text-background",
            isActive &&
              "after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:h-0.5 after:w-full after:rounded-full after:bg-background/80 font-semibold text-background/80",
          )}
        >
          {item.title}
        </Link>
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
};

// ====================== Mobile Menu ======================
const MobileMenu = ({
  menu,
  authView,
  setAuthView,
  email,
  setEmail,
  isLoggedIn,
  user,
  handleLogOut,
}: any) => {
  return (
    <div className="block lg:hidden py-2">
      <div className="flex items-center justify-between">
        <FeleTripLogo />

        <Sheet>
          <SheetTrigger asChild>
            <Button size="icon">
              <Menu className="size-4" />
            </Button>
          </SheetTrigger>

          <SheetContent className="overflow-y-auto lg:hidden">
            <SheetHeader>
              <SheetTitle>
                <FeleTripLogo />
              </SheetTitle>
            </SheetHeader>

            <div className="flex flex-col gap-6 p-4">
              <Accordion
                type="single"
                collapsible
                className="flex w-full flex-col gap-4"
              >
                {menu.map((item: MenuItem) => (
                  <MobileMenuItem key={item.title} item={item} />
                ))}
              </Accordion>

              <AuthButtons
                isLoggedIn={isLoggedIn}
                user={user}
                handleLogOut={handleLogOut}
                authView={authView}
                setAuthView={setAuthView}
                email={email}
                setEmail={setEmail}
              />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};

const MobileMenuItem = ({ item }: { item: MenuItem }) =>
  item.items ? (
    <AccordionItem value={item.title} className="border-b-0">
      <AccordionTrigger className="text-md py-0 font-semibold hover:no-underline">
        {item.title}
      </AccordionTrigger>
      <AccordionContent className="mt-2">
        {item.items.map((subItem) => (
          <SubMenuLink key={subItem.title} item={subItem} />
        ))}
      </AccordionContent>
    </AccordionItem>
  ) : (
    <Link
      href={item.url}
      className="block text-md font-semibold py-3 px-1 hover:text-primary transition-colors"
    >
      {item.title}
    </Link>
  );

const SubMenuLink = ({ item }: { item: MenuItem }) => (
  <Link
    href={item.url}
    className="flex min-w-80 flex-row gap-4 rounded-md p-3 leading-none no-underline transition-colors outline-none select-none hover:bg-muted hover:text-accent-foreground"
  >
    {item.icon && <div className="text-foreground">{item.icon}</div>}
    <div>
      <div className="text-sm font-semibold">{item.title}</div>
      {item.description && (
        <p className="text-sm leading-snug text-muted-foreground">
          {item.description}
        </p>
      )}
    </div>
  </Link>
);

export { Navbar };
