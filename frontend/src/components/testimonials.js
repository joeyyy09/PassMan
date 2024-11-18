import React from "react";

export default function TestimonialSection() {
  return (
    <div className="bg-gray-900 pt-16 pb-12">
      <div className="container my-24 px-12 mx-auto">
        <section className="mb-32 text-gray-300 text-center md:mb-12">
          <h2 className="text-3xl font-bold mb-12 text-white">Testimonials</h2>

          {/* Center the testimonials on mobile */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 lg:gap-x-12 text-center">
            {[
              {
                name: "Joey Tribbiani",
                role: "Web Developer",
                image:
                  "https://mdbootstrap.com/img/Photos/Avatars/img%20(1).jpg",
                comment:
                  "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod eos id officiis hic tenetur quae quaerat ad velit ab hic tenetur.",
                rating: 4.5,
              },
              {
                name: "Rachel Green",
                role: "Graphic Designer",
                image:
                  "https://mdbootstrap.com/img/Photos/Avatars/img%20(2).jpg",
                comment:
                  "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid commodi.",
                rating: 5,
              },
              {
                name: "Chandler Bing",
                role: "UI/UX Designer",
                image:
                  "https://mdbootstrap.com/img/Photos/Avatars/img%20(9).jpg",
                comment:
                  "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti.",
                rating: 4,
              },
            ].map((testimonial, index) => (
              <div
                key={index}
                className="mb-12 md:mb-0 flex flex-col items-center"
              >
                <div className="flex justify-center mb-6">
                  <img
                    src={testimonial.image}
                    className="rounded-full shadow-lg w-32"
                    alt={testimonial.name}
                  />
                </div>

                <h5 className="text-lg font-bold mb-4 text-white">
                  {testimonial.name}
                </h5>
                <h6 className="font-medium mb-4">
                  {testimonial.role}
                </h6>
                <p className="mb-4">{testimonial.comment}</p>

                <ul className="flex justify-center mb-0">
                  {[...Array(5)].map((_, i) => (
                    <li key={i}>
                      <svg
                        aria-hidden="true"
                        focusable="false"
                        data-prefix="fas"
                        data-icon="star"
                        className={`w-4 ${
                          i < Math.floor(testimonial.rating)
                            ? "text-yellow-500"
                            : "text-gray-600"
                        }`}
                        role="img"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 576 512"
                      >
                        <path
                          fill="currentColor"
                          d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"
                        ></path>
                      </svg>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
