import { resizeImage } from '@starter-kit/utils/image';
import Link from 'next/link';
import { PublicationFragment } from '../generated/graphql';
import { useAppContext } from './contexts/appContext';

const getPublicationLogo = (publication: PublicationFragment, isSidebar?: boolean) => {
	if (isSidebar) {
		return publication.preferences.logo; // Always display light mode logo in sidebar
	}
	return publication.preferences.darkMode?.logo || publication.preferences.logo;
};

export const PublicationLogo = ({ isSidebar }: { isSidebar?: boolean }) => {
	const { publication } = useAppContext();
	const PUBLICATION_LOGO = getPublicationLogo(publication, isSidebar);

	return (
		<h1 className="relative w-full">
			<Link
				href={'https://s-soumyakanta.com'}
				aria-label={`${publication.title} blog home page`}
				className="flex flex-row items-center justify-center gap-3"
			>
				{PUBLICATION_LOGO ? (
					<>
						<img
							className="block w-32 shrink-0 md:w-40"
							alt={publication.title}
							src={resizeImage(PUBLICATION_LOGO, { w: 320, h: 80 })}
						/>
						<span className="text-2xl font-semibold text-white md:text-3xl">Blog</span>
					</>
				) : (
					<span
						className={`block text-lg font-semibold md:text-2xl ${
							isSidebar ? 'text-black dark:text-white' : 'text-white text-lg md:text-2xl'
						}`}
					>
						{publication.title}
					</span>
				)}
			</Link>
		</h1>
	);
};
