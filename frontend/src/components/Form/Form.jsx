import React, { useState } from "react";

const Form = () => {
	const [contacts, setContacts] = useState([]);
	const [error, setError] = useState("");
    const handleSubmit = (e) => {
        setError("")
		e.preventDefault();
		const form = e.target;
		const name = form.name.value;
		const number = form.number.value;

		fetch("http://localhost:5000/contacts", {
			method: "POST",
			headers: {
				"content-type": "application/json",
			},
			body: JSON.stringify({ name, number }),
		})
            .then((response) => {
                form.reset();
				if (response.status === 400) {
					return setError("Number already exists.");
				}
			})

			.catch((error) => {
				console.log("Error:",error);
			});
	};

	return (
		<div className="w-full max-w-md mx-auto mt-10">
			<form
				className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
				onSubmit={handleSubmit}>
				<div className="mb-4">
					<label
						className="block text-gray-700 text-sm font-bold mb-2"
						htmlFor="name">
						Name
					</label>
					<input
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						id="name"
						type="text"
						placeholder="name"
						required
					/>
				</div>
				<div className="mb-6">
					<label
						className="block text-gray-700 text-sm font-bold mb-2"
						htmlFor="number">
						Number
					</label>
					<input
						className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
						id="number"
						type="number"
						placeholder="+8801864361681"
						required
					/>
                <p className="text-red-700 text-sm">{ error}</p>
                </div>
				<div className="flex items-center justify-between">
					<button
						className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
						type="submit">
						Add
					</button>
				</div>
			</form>
		</div>
	);
};

export default Form;
