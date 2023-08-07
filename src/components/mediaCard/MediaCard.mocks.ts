import { IMediaCard } from './MediaCard'

const base: IMediaCard = {
  label: '',
  heading: 'אמרות היסוד: על האושר וההנאות האמיתיות',
  description: 'לורם איפסום דולור סיט אמט, קונסקטורר אדיפיסינג אלית קולורס מונפרד אדנדום סילקוף, מרגשי ומרגשח. עמחליף קולהע צופעט למרקוח איבן איף, ברומץ כלרשט מיחוצים. קלאצי מוסן מנת.',
  author: 'אפיקורוס',
  imageSrc: 'https://simania.co.il/bookimages/covers97/978330.jpg',
  alt: 'bookImage',
  imageWidth: 0,
  imageHeight: 0,
  ownerId: '',
  loanable: false,
  itemCondition: '',
  maxLoanPeriod: '',
  itemLocation: {
    city: '',
    streetName: '',
    streetNumber: '',
    zipCode: ''
  }
}

export const mockMediaCardProps = {
  base,
}
