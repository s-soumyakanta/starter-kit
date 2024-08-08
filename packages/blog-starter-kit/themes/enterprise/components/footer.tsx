import Link from 'next/link';
import { useAppContext } from './contexts/appContext';
import { SocialLinks } from './social-links';

export const Footer = () => {
	const { publication } = useAppContext();
	const PUBLICATION_LOGO = publication.preferences.logo;
	return (
		<footer className="border-t py-24 dark:border-neutral-800  ">
			<div className="flex flex-col md:flex-row space-y-4 md:space-y-0 items-center justify-between px-5 text-center">
				{PUBLICATION_LOGO ? (
					<div className="mb-20 flex w-full flex-row justify-center">
						<Link
							href={'/'}
							aria-label={`${publication.title} home page`}
							className="flex flex-row items-center gap-5"
						>
							<img className="block w-40" src={PUBLICATION_LOGO} alt={publication.title} />
						</Link>
					</div>
				) : (
					<div>
						<Link
							href="https://s-soumyakanta.com"
							className="mb-20 text-center text-xl font-semibold text-slate-900 dark:text-slate-50 md:text-2xl"
						>
							{publication.title}
						</Link>
					</div>
				)}
				<div>
					<SocialLinks />
				</div>
			</div>
		</footer>
	);
};
