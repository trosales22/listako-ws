export default class GeneralConstants {
  public static PH_TIMEZONE = 'Asia/Manila'
  public static SESSION_EXPIRY = '480mins' //8hrs

  public static ENVIRONMENT_TYPES = {
    DEVELOPMENT: 'development',
    PRODUCTION: 'production',
  }

  public static ROLE_TYPES = {
    USER: 'USER'
  }

  public static ROLE_LABELS = {
    [this.ROLE_TYPES.USER]: 'User'
  }

  public static GENERAL_STATUS_TYPES = {
    ACTIVE: 'active',
    INACTIVE: 'inactive',
  }

  public static GENERAL_STATUS_LABELS = {
    [this.GENERAL_STATUS_TYPES.ACTIVE]: 'Active',
    [this.GENERAL_STATUS_TYPES.INACTIVE]: 'Inactive',
  }

  public static BUSINESS_VEHICLE_PREFIX = 'BV'
  public static PARKING_LOGS_PREFIX = 'PL'

  public static MONTH_NAMES = {
    1: 'January',
    2: 'February',
    3: 'March',
    4: 'April',
    5: 'May',
    6: 'June',
    7: 'July',
    8: 'August',
    9: 'September',
    10: 'October',
    11: 'November',
    12: 'December',
  }

  public static TASK_STATUS_CODES = {
    PENDING: 'pending',
    IN_PROGRESS: 'in_progress',
    COMPLETED: 'completed'
  }

  public static TASK_STATUS_LABELS = {
    [this.TASK_STATUS_CODES.PENDING]: 'Pending',
    [this.TASK_STATUS_CODES.IN_PROGRESS]: 'In Progress',
    [this.TASK_STATUS_CODES.COMPLETED]: 'Completed',
  }

  public static TASK_PRIORITY_CODES = {
    LOW: 'low',
    MEDIUM: 'medium',
    HIGH: 'high'
  }

  public static TASK_PRIORITY_LABELS = {
    [this.TASK_PRIORITY_CODES.LOW]: 'Low',
    [this.TASK_PRIORITY_CODES.MEDIUM]: 'Medium',
    [this.TASK_PRIORITY_CODES.HIGH]: 'High',
  }
}
