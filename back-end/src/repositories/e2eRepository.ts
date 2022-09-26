import prisma from "../database.js";


export async function resetDB() {
    return await prisma.$executeRaw`TRUNCATE TABLE recommendations`;
}

export async function insertTopList() {
    return await prisma.recommendation.createMany({
        data:[
            {name:"1_rec", youtubeLink:"https://www.youtube.com/watch?v=8-eHKmJRlD4&t=367s",score:5},
            {name:"2_rec", youtubeLink:"https://www.youtube.com/watch?v=yKNxeF4KMsY",score:4},
            {name:"3_rec", youtubeLink:"https://www.youtube.com/watch?v=wXNgZRrPlu8",score:3},
            {name:"4_rec", youtubeLink:"https://www.youtube.com/watch?v=aVGPLa8iyM4",score:2},
            {name:"5_rec", youtubeLink:"https://www.youtube.com/watch?v=8-eHKmJRlD4&t=367s",score:-3},
            {name:"6_rec", youtubeLink:"https://www.youtube.com/watch?v=8-eHKmJRlD4&t=367s",score:-4}
        ]
    });
}


