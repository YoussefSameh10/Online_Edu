
 export function compareByName (i, j) {
  if(i.name < j.name){
    return -1
  }
  else if(i.name > j.name){
    return 1
  }
  return 0
}

export function compareByStudentName (i, j) {
  if(i.studentName < j.studentName){
    return -1
  }
  else if(i.studentName > j.studentName){
    return 1
  }
  return 0
}

export function compareByCourseName (i, j) {
  if(i.course_name < j.course_name){
    return -1
  }
  else if(i.course_name > j.course_name){
    return 1
  }
  return 0
}

export function compareByCourseYearAndName (i, j) {
  if(i.year < j.year){
    return -1
  }
  else if(i.year > j.year){
    return 1
  }
  else if(i.name < j.name){
    return -1
  }
  else if(i.name > j.name){
    return 1
  }
  return 0
}

export function lessonsToTree(lesson){
  if(lesson.video_id){
    return {
      id: lesson._id,
      name: lesson.lesson_title,
      children: [
        {
          id: `${lesson.lesson_name_filesystem}`,
          name: 'PDF',
          children: [
            {
              id: `${lesson.lesson_name_filesystem}PDFPREVIEW`,
              name: 'Preview',
              fileName: lesson.lesson_name_filesystem
            },
            {
              id: `${lesson.lesson_name_filesystem}PDFDOWNLOAD`,
              name: 'Download',
              fileName: lesson.lesson_name_filesystem
            },
          ]
        },
        {
          id: `${lesson.video_id}`,
          name: 'VIDEO',
          children: [
            {
              id: `${lesson.video_id}VIDEOPREVIEW`,
              name: 'Player',
              videoID: lesson.video_id
            },
            {
              id: `${lesson.video_id}VIDEOYOUTUBE`,
              name: 'Youtube',
              videoID: lesson.video_id
            },
          ]
        }
      ]
    }
  }
  else{
    return {
      id: lesson._id,
      name: lesson.lesson_title,
      children: [
        {
          id: `${lesson.lesson_name_filesystem}`,
          name: 'PDF',
          children: [
            {
              id: `${lesson.lesson_name_filesystem}PDFPREVIEW`,
              name: 'Preview',
              fileName: lesson.lesson_name_filesystem
            },
            {
              id: `${lesson.lesson_name_filesystem}PDFDOWNLOAD`,
              name: 'Download',
              fileName: lesson.lesson_name_filesystem
            },
          ]
        },
      ]
    }

  }
}

export function instructorAssignmentsToTree(assignment){
  if(assignment.submission){
    return {
      id: `${assignment.description._id}${assignment.submission}`,
      name: `Assignment ${assignment.description.title}`,
      children: [
        {
          id: `${assignment.description._id}`,
          name: 'Description',
          fileName: `${assignment.description.fileName}`
        },
        {
          id: `${assignment.description._id}q`,
          name: 'Submission',
          //fileName: `${assignment.submission.fileName}`
        }
      ]
    }
  }
  else{
    return {
      id: `${assignment.description._id}alone`,
      name: `Assignment ${assignment.description.title}`,
      children: [
        {
          id: `${assignment.description._id}`,
          name: 'Description',
          fileName: `${assignment.description.fileName}`
        },
      ]
    }
  }
}

export function studentAssignmentsToTree(assignment){
  if(assignment.submission){
    return {
      id: `${assignment.description._id}${assignment.submission}`,
      name: `Assignment ${assignment.description.title}`,
      title: `${assignment.description.title}`,
      children: [
        {
          id: `${assignment.description._id}`,
          name: 'Description',
          fileName: `${assignment.description.fileName}`,
          title: `${assignment.description.title}`,
        },
        {
          id: `${assignment.description._id}withsubmission`,
          name: 'Submission',
          fileName: `${assignment.submission.fileName}`,
          title: `${assignment.description.title}`,
        }
      ]
    }
  }
  else{
    return {
      id: `${assignment.description._id}alone`,
      name: `Assignment ${assignment.description.title}`,
      title: `${assignment.description.title}`,
      children: [
        {
          id: `${assignment.description._id}`,
          name: 'Description',
          fileName: `${assignment.description.fileName}`,
          title: `${assignment.description.title}`,
        },
        {
          id: `${assignment.description._id}withoutsubmission`,
          name: 'Submission',
          fileName: null,
          title: `${assignment.description.title}`,
        }
      ]
    }
  }
}