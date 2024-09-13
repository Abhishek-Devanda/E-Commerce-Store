import { useEffect } from "react";
import CategoryItem from "../components/CategoryItem";
import FeaturedProducts from "../components/FeaturedProducts";
import PageHeading from "../components/PageHeading";

import { useProductStore } from "../stores/useProductStore";

const categories = [
	{ href: "/jeans", name: "jeans", imageUrl: "/jeans.jpg" },
	{ href: "/t-shirts", name: "t-shirts", imageUrl: "/tshirts.jpg" },
	{ href: "/shoes", name: "shoes", imageUrl: "/shoes.jpg" },
	{ href: "/glasses", name: "glasses", imageUrl: "/glasses.png" },
	{ href: "/jackets", name: "jackets", imageUrl: "/jackets.jpg" },
	{ href: "/suits", name: "suits", imageUrl: "/suits.jpg" },
];

function HomePage() {
	const { featuredProducts, fetchFeaturedProducts, isLoading } = useProductStore();

	useEffect(() => {
		fetchFeaturedProducts();
	}, [fetchFeaturedProducts]);

	return (
		<div className='relative min-h-screen text-white overflow-hidden'>
			<div className='relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16'>

				<PageHeading
					textSize="text-4xl sm:text-5xl lg:text-6xl"
					mainHeading="Explore Store"
					subHeading="Discover the latest trends and fashion"
				/>

				{!isLoading && featuredProducts.length > 0 &&
					<FeaturedProducts featuredProducts={featuredProducts} />
				}

				<h2 className='text-3xl sm:text-4xl font-bold text-emerald-400 mt-8 mb-4'>Categories</h2>
				<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
					{categories.map((category) => (
						<CategoryItem
							href={category.href}
							name={category.name}
							imageUrl={category.imageUrl}
							key={category.name}
							className='transition-transform transform hover:scale-105'
						/>
					))}
				</div>

			</div>
		</div>
	)
}

export default HomePage;
