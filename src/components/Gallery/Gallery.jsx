import "./Gallery.scss";

const images = [
	{
		"id": 1,
		"alt": "lights and people",
		"src": "Photo-gallery-1.jpg",
	},
	{
		"id": 2,
		"alt": "girl dancing",
		"src": "Photo-gallery-2.jpg",
	},
	{
		"id": 3,
		"alt": "hands up",
		"src": "Photo-gallery-3.jpg",
	},
	{
		"id": 4,
		"alt": "lights and girl",
		"src": "Photo-gallery-4.jpg",
	},
	{
		"id": 5,
		"alt": "hands and lights",
		"src": "Photo-gallery-5.jpg",
	},
	{
		"id": 6,
		"alt": "singer",
		"src": "Photo-gallery-6.jpg",
	},
	{
		"id": 7,
		"alt": "spectacular lights",
		"src": "Photo-gallery-7.jpg",
	},
	{
		"id": 8,
		"alt": "DJ mixer",
		"src": "Photo-gallery-8.jpg",
	},
	{
		"id": 9,
		"alt": "sparkles in audience",
		"src": "Photo-gallery-9.jpg",
	},
];

const Gallery = () => {
	const image = images.map((img) => {
		return (
			<img
				className="gallery__img"
				key={img.id}
				src={require("../../assets/images/" + img.src)}
				alt={img.alt}
			/>
		);
	});

	return (
		<section className="gallery">
			<h2 className="gallery__heading">Photo Gallery</h2>
			<div className="gallery__img-container">{image}</div>
		</section>
	);
};
export default Gallery;
