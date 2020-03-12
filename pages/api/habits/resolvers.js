export const habitsResolvers = {
  Query: {
    async Habits() {
      console.log("habits resolver");
      return [
        {
          _id: "somefunkyarray",
          name: "Make my bed"
        }
      ];
    }
  }
};
