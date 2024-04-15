import Link from "next/link";

const Header = () => {
  return (
    <ul className="flex gap-8 justify-center">
      <HeaderComponent name="Login" link="/login" />
      <HeaderComponent name="Filter" link="/filter" />
      <HeaderComponent name="Table" link="/table" />
      <HeaderComponent name="Inbox" link="/inbox" />
    </ul>
  );
};

const HeaderComponent = ({ name, link }: { name: string; link: string }) => {
  return (
    <li>
      <Link
        className="px-8 py-2 border border-black rounded-lg hover:bg-[#00000010]"
        href={link}
      >
        {name}
      </Link>
    </li>
  );
};

export default Header;
