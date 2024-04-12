import en from './en';

const or: typeof en = {
  auth: {
    loginTitle: 'Accountii kessanitti Login godha',
  },
  dynamic: ({ name }: { name: string }) => `Akkam ${name}`,
};

export default or;
