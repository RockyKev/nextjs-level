export const habitsResolvers = {
  Query: {
    async habits() {
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
