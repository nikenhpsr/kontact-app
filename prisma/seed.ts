import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

// initialize Prisma Client
const prisma = new PrismaClient();
const roundsOfHashing = 10;

async function main() {
  // create two dummy users
  const passwordSabin = await bcrypt.hash('password-sabin', roundsOfHashing);
  const passwordAlex = await bcrypt.hash('password-alex', roundsOfHashing);
  const user1 = await prisma.user.upsert({
    where: { email: 'sabin@adams.com' },
    update: {
      password: passwordSabin
    },
    create: {
      email: 'sabin@adams.com',
      username: 'sabinadams',
      password: passwordSabin,
    },
  });

  const user2 = await prisma.user.upsert({
    where: { email: 'alex@ruheni.com' },
    update: {
      password: passwordAlex,
    },
    create: {
      email: 'alex@ruheni.com',
      username: 'alexruheni',
      password: passwordAlex,
    },
  });


  // create two dummy articles
  const post1 = await prisma.contact.upsert({
    where: { id: '1' },
    update: {
      userId: user1.id,
    },
    create: {
      profilePhoto: 'profile-photo-url',
      firstName: 'John',
      lastName: 'Doe',
      address: '123 Main St',
      notes: 'Lorem ipsum dolor sit amet',
      user: { connect: { id: user1.id } }
    },
  });
  
  const post2 = await prisma.contact.upsert({
    where: { id: '2' },
    update: {
      userId: user2.id,
    },
    create: {
      profilePhoto: 'profile-photo-url-2',
      firstName: 'Alex',
      lastName: 'Turner',
      address: '456 Main St',
      notes: 'Lorem ipsum dolor sit amet',
      user: { connect: { id: user2.id } }
    }
  });

  console.log({ post1, post2, user1, user2});
}

// execute the main function
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // close Prisma Client at the end
    await prisma.$disconnect();
  });
