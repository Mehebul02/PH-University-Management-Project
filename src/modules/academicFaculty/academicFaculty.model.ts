import { Schema, model, } from 'mongoose';
import { TAcademicFaculty } from './academicFaculty.interface';

const academicFacultySchema = new Schema<TAcademicFaculty>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  },
);

// Check if the model already exists in the `models` object
export const AcademicFaculty =model<TAcademicFaculty>('AcademicFaculty', academicFacultySchema);
