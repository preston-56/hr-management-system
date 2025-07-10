export interface Activity {
    type: string
    message: string
    department: string
    createdAt?: Date
  }


export interface ActivityItem {
    id: string
    type: 'leave' | 'employee' | 'job_posting' | 'training'
    message: string
    timestamp: string
    department?: string
  }