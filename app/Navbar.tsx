"use client";
import { Avatar, Box, Container, DropdownMenu, Flex } from "@radix-ui/themes";
import classNames from "classnames";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AiFillBug } from "react-icons/ai";
import { Skeleton } from "@/app/components";
const Navbar = () => {
  return (
    <nav className="border-b mb-5 px-5 py-4">
      <Container>
        <Flex justify={"between"}>
          <Flex align={"center"} gap={"3"}>
            <Link href={"/"}>
              <AiFillBug />
            </Link>
            <Navlinks />
          </Flex>
          <AuthStatus />
        </Flex>
      </Container>
    </nav>
  );
};

const Navlinks = () => {
  const currentPath = usePathname();
  const links = [
    {
      href: "/",
      label: "Dashboard",
    },
    {
      href: "/issues/list",
      label: "Issues",
    },
  ];
  return (
    <ul className="flex space-x-3">
      {links.map((link) => (
        <li key={link.href}>
          <Link
            className={classNames({
              navlink: true,
              "!text-zinc-900": link.href == currentPath,
            })}
            href={link.href}
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
};
const AuthStatus = () => {
  const { data: session, status } = useSession();
  if (status === "loading") return <Skeleton width={"4rem"} />;
  if (status === "unauthenticated")
    return <Link href={"/api/auth/signin"}>Login</Link>;
  return (
    <Box>
      <>
        <DropdownMenu.Root>
          <DropdownMenu.Trigger>
            <Avatar
              src={session!.user!.image!}
              fallback="?"
              size={"2"}
              radius="full"
              referrerPolicy="no-referrer"
            />
          </DropdownMenu.Trigger>
          <DropdownMenu.Content align="end">
            <DropdownMenu.Label>{session!.user!.email!}</DropdownMenu.Label>
            <DropdownMenu.Item>
              <Link href={"/api/auth/signout"}>Log out</Link>
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      </>
    </Box>
  );
};
export default Navbar;
