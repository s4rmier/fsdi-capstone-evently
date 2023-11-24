class DataService {
  getList() {
    // todo: call the server
    return [
      {
        eventTitle: "Hailey Turns 3!",
        eventDescription: "",
        eventDate: "11/1/23",
        eventTime: "3:00PM",
        eventAddress: "123 Victoria St., San Diego, CA, 91914",
        eventGalleryUrls: [],
        eventThumbnail: "",
        eventCover:
          "https://images.pexels.com/photos/16322562/pexels-photo-16322562/free-photo-of-photo-of-a-baby-playing-with-a-birthday-cake.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        userID: "",
        _id: "",
      },
      {
        eventTitle: "Harry Potter - Book Tour",
        eventDescription: "",
        eventDate: "06/25/24",
        eventTime: "10:00AM",
        eventAddress: "Brett Wilson Library, Victoria",
        eventGalleryUrls: [],
        eventThumbnail: "",
        eventCover:
          "https://images.pexels.com/photos/5634773/pexels-photo-5634773.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        userID: "",
        _id: "",
      },
    ];
  }
}

export default new DataService();
