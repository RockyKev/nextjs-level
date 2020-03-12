import Habits from "./habits";

export const habitsResolvers = {
  Query: {
    async habits() {
      try {
        const habits = await Habits.find();
        return habits;
      } catch (e) {
        console.error("e", e);
      }

      // console.log("habits resolver");
      // return [
      //   {
      //     _id: "somefunkyarray",
      //     name: "Make my bed"
      //   }
      // ];
    }
  }
};
