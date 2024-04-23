import { connectToDb } from "./ConnectToDb";
import { faker } from "@faker-js/faker";
import { Post, User } from "./models";

export const createUser = async (numUsers) => {
  try {
    await connectToDb();
    const usersPromise = [];
    const option = [true, false];

    for (let i = 0; i < numUsers; i++) {
      const tempUser = User.create({
        email: faker.internet.email(),
        username: faker.internet.userName(),
        password: "password",
        img: faker.image.avatar(),
        isAdmin: option[Math.floor(Math.random() * option.length)],
      });

      usersPromise.push(tempUser);
    }

    await Promise.all(usersPromise);

    console.log("Users created", numUsers);
    process.exit(1);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

export const createPosts = async (numPosts) => {
  try {
    await connectToDb();

    const users = await User.find().select("_id");

    const postsPromise = [];

    for (let i = 0; i < numPosts; i++) {
      const randomUser = users[Math.floor(Math.random() * users.length)];

      postsPromise.push(
        Post.create({
          title: faker.lorem.sentence(10),
          desc: faker.lorem.sentence(500),
          img: faker.image.avatar(),
          slug: faker.lorem.slug(3),
          user: randomUser,
        })
      );
    }

    await Promise.all(postsPromise);

    console.log("posts created successfully");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};
