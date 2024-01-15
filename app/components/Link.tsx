import NextLink from "next/link";
import { Link as RadixLink } from "@radix-ui/themes";
import React, { ReactNode } from "react";
interface Props {
  href: string;
  children: ReactNode;
}
const Link = ({ href, children }: Props) => {
  return (
    <NextLink href={href} passHref legacyBehavior>
      <RadixLink>{children}</RadixLink>
    </NextLink>
  );
};

export default Link;
