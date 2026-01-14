/**
 * Seed the database with books and reading lists
 */
const { Book, ReadingList } = require('./bookModel');
const mongoose = require('mongoose');
/* Data for Books */
const books = [
  {
    title: 'Socratic Logic',
    author: 'Peter Kreeft',
    year: 1990,
    image: 'https://images.pexels.com/photos/26887007/pexels-photo-26887007.jpeg',
    category: 'TEXTBOOK',
    description: 'Socratic Logic is a comprehensive textbook on Aristotelian and Socratic logic, designed for students and general readers. It introduces the principles of classical logic, clear thinking, and argumentation, blending philosophical depth with practical exercises.'
  },
  {
    title: 'The Lord of the Ring',
    author: 'J.R.R. Tokien',
    year: 1937,
    image: 'https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg',
    category: 'NOVEL',
    description: 'The Lord of the Rings by J. R. R. Tolkien is an epic high-fantasy trilogy that follows the perilous journey of hobbit Frodo Baggins and his companions to destroy the One Ring, a powerful artifact sought by the dark lord Sauron, in a richly imagined world of adventure, courage, and friendship'
  },
  {
    title: 'Chronicles of Narnia',
    author: 'C.S. Lewis',
    year: 1954,
    image: 'https://images.pexels.com/photos/159778/books-reading-series-narnia-159778.jpeg',
    category: 'NOVEL',
    description: 'The Chronicles of Narnia is a beloved fantasy series that transports readers to the magical land of Narnia, where talking animals, mythical creatures, and epic battles between good and evil unfold.'
  },
  {
    title: 'Harry Potter',
    author: 'J.K. Rowling',
    year: 1997,
    image: 'https://images.pexels.com/photos/31269856/pexels-photo-31269856.jpeg',
    category: 'NOVEL',
    description: 'The story follows the young wizard Harry Potter and his friends Hermione Granger and Ron Weasley, all of whom are students at Hogwarts School of Witchcraft and Wizardry. The main plot concerns Harry\'s struggle against the dark wizard who aims to become immortal and conquer the wizarding world.'
  },
  {
    title: 'Software Engineering',
    author: 'Ian Sommerville',
    year: 2016,
    image: 'https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg',
    category: 'TEXTBOOK',
    description: 'Software Engineering is a comprehensive textbook that covers the principles and practices of software engineering. It addresses the entire software development lifecycle, including requirements analysis, design, implementation, testing, and maintenance.'
  },

  {
    title: 'Screwtape Letters',
    author: 'C.S. Lewis',
    year: 1942,
    image: 'https://images.pexels.com/photos/51343/old-letters-old-letter-handwriting-51343.jpeg',
    category: 'PHILOSOPHY',
    description: 'The Screwtape Letters talks about a series of letters Screwtape, to his nephew, Wormwood. The letters offer advice on how to tempt and corrupt a human soul, providing insights into human nature, morality.'
  },
  {
    title: 'The Republic',
    author: 'Plato',
    year: 2000,
    image: 'https://images.pexels.com/photos/159862/art-school-of-athens-raphael-italian-painter-fresco-159862.jpeg',
    category: 'PHILOSOPHY',
    description: 'The Republic is a foundational philosophical text that explores justice, the ideal state, and the nature of the human soul. Through a series of dialogues led by Socrates, Plato examines the concept of justice, and the structure of an ideal society.'
  },
  {
    title: 'Javascript The Definitive Guide',
    author: 'David Flanagan',
    year: 2011,
    image: 'https://images.pexels.com/photos/1089440/pexels-photo-1089440.jpeg',
    category: 'TEXTBOOK',
    description: 'This  is a comprehensive reference book that covers the JavaScript programming language in depth. It provides detailed explanations of JavaScript core features, including syntax, data types, functions, and objects, as well as advanced topics like closures, prototypes, and asynchronous programming.'
  },
  {
    title: 'Ideas of a university',
    author: 'John Henry Newman',
    year: 1852,
    image: 'https://images.pexels.com/photos/14505030/pexels-photo-14505030.jpeg',
    category: 'PHILOSOPHY',
    description: "This is a work on the philosophy of education and the role of universities in society. Newman argues for the importance of a liberal education and the cultivation of the intellect, emphasizing the value of knowledge for its own sake."
  },
  {
    title: 'Research Methodology',
    author: 'C.R. Kothari',
    year: 2004,
    image: 'https://images.pexels.com/photos/1370296/pexels-photo-1370296.jpeg',
    category: 'TEXTBOOK',
    description: 'This is a comprehensive guide to the principles and practices of research in the social sciences. It covers various research methods, including qualitative and quantitative approaches, and provides practical guidance on designing and conducting research studies.'
  },
  {
    title: 'Pensées',
    author: 'Blaise Pascal',
    year: 1660,
    image: 'https://images.pexels.com/photos/20494169/pexels-photo-20494169.jpeg',
    category: 'PHILOSOPHY',
    description: 'This is a collection of thoughts and reflections on religion, philosophy, and human nature. Written in the 17th century, the work explores themes of faith, reason, and the human condition, and is considered a classic of French literature.'
  },
  {
    title: 'The Divine Comedy',
    author: 'Dante',
    year: 1984,
    image: 'https://images.pexels.com/photos/126271/pexels-photo-126271.jpeg',
    category: 'PHILOSOPHY',
    description: 'This is an epic poem that takes readers on a journey through the realms of Hell, Purgatory, and Paradise. Written in the 14th century, the poem explores themes of sin, redemption, and divine justice, and is considered one of the greatest works of world literature.'
  },
  {
    title: 'Data Structures and Algorithms using Python',
    author: 'Rance D. Necaise',
    year: 2011,
    image: 'https://images.pexels.com/photos/92904/pexels-photo-92904.jpeg',
    category: 'TEXTBOOK',
    description: 'This is a comprehensive textbook that covers fundamental data structures and algorithms using the Python programming language. It provides clear explanations of concepts such as arrays, linked lists, stacks, queues, trees, and graphs, along with practical examples and exercises.'
  },
  {
    title: 'R Graphics Cookbook',
    author: 'Winston Chang',
    year: 2013,
    image: 'https://images.pexels.com/photos/936135/pexels-photo-936135.jpeg',
    category: 'TEXTBOOK',
    description: 'This is a practical guide to creating visualizations using the R programming language. The book provides a collection of recipes for generating a wide range of plots and charts, along with tips and techniques for customizing and enhancing graphics in R.'
  },
];

/* Add books and readling lists into database */
async function seed() {
  // Helper to sample one book per category in parallel
  async function sampleBooksForCategories(categories) {
    const promises = categories.map(category =>
      Book.aggregate([
        { $match: { category } },
        { $sample: { size: 1 } }
      ])
    );
    const results = await Promise.all(promises);
    return results.map(result => result[0]).filter(book => book); // Filter out nulls
  }

  try {
    // Drop and insert books
    await Book.collection.drop();
    console.log('Current books dropped!');
    await Book.insertMany(books);
    console.log('New books saved!');

    // Drop and generate reading lists
    await ReadingList.collection.drop();
    console.log('Current reading lists dropped!');

    const categories = ['TEXTBOOK', 'PHILOSOPHY', 'NOVEL'];
    const readingLists = [];

    for (let i = 1; i <= 10; i++) {
      const sampledBooks = await sampleBooksForCategories(categories);
      if (sampledBooks.length === categories.length) {
        readingLists.push({ name: `Reading List ${i}`, books: sampledBooks });
      }
    }

    // Batch insert reading lists
    await ReadingList.insertMany(readingLists);
    console.log('New reading lists saved!');
  } catch (error) {
    console.error('Error in seeding:', error.message);
  }
}

async function checkAndExit() {
  try {
    console.log('Checking DB for records...');
    const bookCount = await Book.countDocuments();
    const readingListCount = await ReadingList.countDocuments();
    console.log(`Total books in DB: ${bookCount}`);
    console.log(`Total reading lists in DB: ${readingListCount}`);
  } catch (err) {
    console.error('Error checking DB:', err);
  } finally {
    mongoose.connection.close();
    process.exit(0);
  }
}

seed().then(() => checkAndExit()).catch(console.error);