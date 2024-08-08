import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';
import { PublicationNavbarItem } from '../generated/graphql';
import { Button } from './button';
import { Container } from './container';
import { useAppContext } from './contexts/appContext';
import HamburgerSVG from './icons/svgs/HamburgerSVG';
import { PublicationLogo } from './publication-logo';
import PublicationSidebar from './sidebar';

function hasUrl(
	navbarItem: PublicationNavbarItem,
): navbarItem is PublicationNavbarItem & { url: string } {
	return !!navbarItem.url && navbarItem.url.length > 0;
}

export const Header: React.FC = () => {
	const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || '/';
	const [isSidebarVisible, setIsSidebarVisible] = useState<boolean>(false);
	const [theme, setTheme] = useState<string>('light');
	const { publication } = useAppContext();
	const navbarItems = publication.preferences.navbarItems.filter(hasUrl);
	const visibleItems = navbarItems.slice(0, 3);
	const hiddenItems = navbarItems.slice(3);

	useEffect(() => {
		const root = window.document.documentElement;
		if (theme === 'dark') {
			root.classList.add('dark');
		} else {
			root.classList.remove('dark');
		}
	}, [theme]);

	const toggleTheme = () => {
		setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
	};

	const toggleSidebar = () => {
		setIsSidebarVisible((prevVisibility) => !prevVisibility);
	};

	const navList = (
		<ul className="flex flex-row items-center gap-2 text-white">
			{visibleItems.map((item) => (
				<li key={item.url}>
					<a
						href={item.url}
						target="_blank"
						rel="noopener noreferrer"
						className="transition-200 block max-w-[200px] truncate text-ellipsis whitespace-nowrap rounded-full p-2 transition-colors hover:bg-white hover:text-black dark:hover:bg-neutral-800 dark:hover:text-white text-black dark:text-white"
					>
						{item.label}
					</a>
				</li>
			))}

			{hiddenItems.length > 0 && (
				<li>
					<DropdownMenu.Root>
						<DropdownMenu.Trigger asChild>
							<button className="transition-200 block rounded-full p-2 transition-colors hover:bg-white hover:text-black dark:hover:bg-neutral-800 dark:hover:text-white">
								More
							</button>
						</DropdownMenu.Trigger>

						<DropdownMenu.Portal>
							<DropdownMenu.Content
								className="w-48 rounded border border-gray-300 bg-white text-neutral-950 shadow-md dark:border-neutral-800 dark:bg-neutral-900 dark:text-white"
								align="end"
								sideOffset={5}
							>
								{hiddenItems.map((item) => (
									<DropdownMenu.Item asChild key={item.url}>
										<a
											href={item.url}
											target="_blank"
											rel="noopener noreferrer"
											className="transition-200 block truncate p-2"
										>
											{item.label}
										</a>
									</DropdownMenu.Item>
								))}
							</DropdownMenu.Content>
						</DropdownMenu.Portal>
					</DropdownMenu.Root>
				</li>
			)}
		</ul>
	);

	return (
		<header className="border-b px-5 py-5 dark:border-neutral-800">
			<Container className="flex w-full items-center justify-between">
				<div className="flex items-center gap-5 text-slate-300">
					<PublicationLogo />
				</div>
				<div className="hidden items-center gap-5 lg:flex">
					<nav className="flex space-x-2 text-black dark:text-white">
						{navList}{' '}
						<button
							onClick={toggleTheme}
							className="transition-200 block rounded-full p-2 darky"
						>
							{theme === 'light' ? (
								<Moon className="h-5 w-5" />
							) : (
								<Sun className="h-5 w-5 text-white" />
							)}
						</button>
					</nav>
				</div>
				<div className="flex items-center gap-3 lg:hidden">
					<button
						onClick={toggleTheme}
						className="transition-200 block rounded-full p-2 transition-colors hover:bg-white hover:text-black dark:hover:bg-neutral-800 dark:hover:text-white"
					>
						{theme === 'light' ? (
							<Moon className="h-5 w-5" />
						) : (
							<Sun className="h-5 w-5 text-white" />
						)}
					</button>
					<Button
						type="outline"
						label=""
						icon={<HamburgerSVG className="h-5 w-5 stroke-current text-black dark:text-white" />}
						className="rounded-xl  !px-3 !py-2 text-white   hover:bg-slate-100 dark:hover:bg-neutral-800"
						onClick={toggleSidebar}
					/>
					{isSidebarVisible && (
						<PublicationSidebar navbarItems={navbarItems} toggleSidebar={toggleSidebar} />
					)}
				</div>
			</Container>
		</header>
	);
};
