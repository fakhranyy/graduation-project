import slugify from 'slugify';
import { Instructor } from 'src/instructor/entities/instructor.entity';
import { Review } from 'src/review/entities/review.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  BeforeInsert,
} from 'typeorm';

@Entity({ name: 'courses' })
export class Course {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  title: string; // elzero js

  @Column()
  slug: string;

  @Column()
  courseDescription: string; // in this course we'll learn ...........

  @Column()
  courseLink: string;

  @Column({ nullable: true })
  numberOfStudents: number;

  @Column({ default: 0 })
  numberOfRatings: number;

  @Column({ type: 'enum', enum: [false, true], default: false })
  isBestSelling: boolean;

  @Column({ length: 50 })
  whatYouWillLearn: string;

  @Column({ default: '85%', length: 6 })
  passPercentage: string;

  @Column({ type: 'simple-array' })
  prerequisites: string; // before start learn nodejs you should know about js

  @Column({ type: 'enum', enum: ['Arabic', 'English'], default: 'English' })
  language: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @Column({
    type: 'enum',
    enum: ['frontend', 'backend', 'mobile applications'],
  })
  category: string;

  @Column({
    type: 'enum',
    enum: [true, false],
    default: false,
  })
  isCertified: boolean;

  @Column({
    type: 'enum',
    enum: ['intermediate', 'beginner', 'advanced'],
  })
  skillLevel: string;

  @Column({ nullable: true })
  thumbnails: string;

  @ManyToOne(() => Instructor, (Instructor) => Instructor.courses, {
    eager: true,
  })
  courseCreator: Instructor;

  @OneToMany(() => Review, (review) => review.course)
  reviews: Review[];

  @BeforeInsert()
  async getSlug(): Promise<any> {
    try {
      this.slug = slugify(this.title, '-');
    } catch (e) {
      return 'there is an error with slugify';
    }
  }
}
