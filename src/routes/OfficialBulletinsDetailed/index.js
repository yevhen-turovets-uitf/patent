import React, { useState } from 'react';
import { useParams, Redirect } from 'react-router-dom';
import moment from "moment";
import {
  openDataRoute,
  officialBulletinsRoute
} from 'urls';
import {
  PageWithSideMenu,
  Breadcrumbs,
  SelectInput,
  OfficialBulletinsSideMenu
} from 'components';
import {
  officialBulletinsDetailedType
} from 'staticData';

export default React.memo(OfficialBulletinsDetailed);
moment.locale("ru");

const yearNow = moment().year();

const options = () => {
  const years = [];
  let counter = yearNow;

  while (counter >= 2013) {
    years.push({ label: counter.toString(), value: counter.toString()});
    counter--;
  }

  return years;
};

function OfficialBulletinsDetailed() {
  const { type } = useParams(),
    crumbs = [
      { to: '/', title: 'Онлайн Роспатент' },
      { to: openDataRoute, title: 'Открытые данные' },
      { to: officialBulletinsRoute, title: 'Официальные бюллетени' },
      `Официальные бюллетени: ${officialBulletinsDetailedType[ type ]}`
    ],
    [year, setYear] = useState(`${yearNow}`);

	return !!officialBulletinsDetailedType[ type ] 
    ? (
    <PageWithSideMenu
      className="official-bulletins-detailed"
      menu={<OfficialBulletinsSideMenu />}
    >
      <Breadcrumbs crumbs={crumbs} />
      <h4 className="section-title">Официальные бюллетени: {officialBulletinsDetailedType[ type ]}</h4>
      <div className="official-bulletins-detailed__date-select">
        <SelectInput
          options={options()}
          value={year}
          onChange={setYear}
        />
      </div>
      <div className="official-bulletins-detailed__content">
        {fakeData[ type ].map(({ month, links }) => (
          <div key={month} className="official-bulletins-detailed__grid-item">
            <div className="official-bulletins-detailed__month">{ getMonth(month) }</div>
            {links.map(({ number, day }) => (
              <a
                key={number}
                href="/"
                className="official-bulletins-detailed__link"
                target="_blank"
                rel="noreferrer"
              >
                {`#${number} от ${day}.${month}.2021`}
              </a>
            ))}
          </div>
        ))}
      </div>
    </PageWithSideMenu>
  )
  : (
    <Redirect to={officialBulletinsRoute}/>
  );
};

const getMonth = ( monthNumber ) => {
  switch (+monthNumber) {
    case 1:
      return 'Январь';
    case 2:
      return 'Февраль';
    case 3:
      return 'Март';
    case 4:
      return 'Апрель';
    case 5:
      return 'Май';
    case 6:
      return 'Июнь';
    case 7:
      return 'Июль';
    case 8:
      return 'Август';
    case 9:
      return 'Сентябрь';
    case 10:
      return 'Октябрь';
    case 11:
      return 'Ноябрь';
    case 12:
      return 'Декабрь';
    default:
      return '';
  }
};

const fakeData = {
  programs: [
    {
      month: '01',
      links: [
        {
          number: '1',
          day: '20'
        }
      ]
    },
    {
      month: '02',
      links: [
        {
          number: '2',
          day: '20'
        }
      ]
    },
    {
      month: '03',
      links: [
        {
          number: '3',
          day: '20'
        }
      ]
    },
    {
      month: '04',
      links: [
        {
          number: '4',
          day: '20'
        }
      ]
    },
    {
      month: '05',
      links: [
        {
          number: '5',
          day: '20'
        }
      ]
    },
    {
      month: '06',
      links: [
        {
          number: '6',
          day: '20'
        }
      ]
    },
    {
      month: '07',
      links: [
        {
          number: '7',
          day: '20'
        }
      ]
    },
    {
      month: '08',
      links: [
        {
          number: '8',
          day: '20'
        }
      ]
    },
    {
      month: '09',
      links: [
        {
          number: '9',
          day: '20'
        }
      ]
    },
    {
      month: '10',
      links: [
        {
          number: '10',
          day: '20'
        }
      ]
    },
    {
      month: '11',
      links: [
        {
          number: '11',
          day: '20'
        }
      ]
    },
    {
      month: '12',
      links: [
        {
          number: '12',
          day: '20'
        }
      ]
    }
  ],
  marks: [
    {
      month: '01',
      links: [
        {
          number: '1',
          day: '12'
        },
        {
          number: '2',
          day: '25'
        }
      ]
    },
    {
      month: '02',
      links: [
        {
          number: '3',
          day: '12'
        },
        {
          number: '4',
          day: '25'
        }
      ]
    },
    {
      month: '03',
      links: [
        {
          number: '5',
          day: '12'
        },
        {
          number: '6',
          day: '25'
        }
      ]
    },
    {
      month: '04',
      links: [
        {
          number: '7',
          day: '12'
        },
        {
          number: '8',
          day: '25'
        }
      ]
    },
    {
      month: '05',
      links: [
        {
          number: '9',
          day: '12'
        },
        {
          number: '10',
          day: '25'
        }
      ]
    },
    {
      month: '06',
      links: [
        {
          number: '11',
          day: '12'
        },
        {
          number: '12',
          day: '25'
        }
      ]
    },
    {
      month: '07',
      links: [
        {
          number: '13',
          day: '12'
        },
        {
          number: '14',
          day: '25'
        }
      ]
    },
    {
      month: '08',
      links: [
        {
          number: '15',
          day: '12'
        },
        {
          number: '16',
          day: '25'
        }
      ]
    },
    {
      month: '09',
      links: [
        {
          number: '17',
          day: '12'
        },
        {
          number: '18',
          day: '25'
        }
      ]
    },
    {
      month: '10',
      links: [
        {
          number: '19',
          day: '12'
        },
        {
          number: '20',
          day: '25'
        }
      ]
    },
    {
      month: '11',
      links: [
        {
          number: '21',
          day: '12'
        },
        {
          number: '22',
          day: '25'
        }
      ]
    },
    {
      month: '12',
      links: [
        {
          number: '23',
          day: '12'
        },
        {
          number: '24',
          day: '25'
        }
      ]
    }
  ],
  models: [
    {
      month: '01',
      links: [
        {
          number: '1',
          day: '10'
        },
        {
          number: '2',
          day: '20'
        },
        {
          number: '3',
          day: '27'
        }
      ]
    },
    {
      month: '02',
      links: [
        {
          number: '4',
          day: '10'
        },
        {
          number: '5',
          day: '20'
        },
        {
          number: '6',
          day: '27'
        }
      ]
    },
    {
      month: '03',
      links: [
        {
          number: '7',
          day: '10'
        },
        {
          number: '8',
          day: '20'
        },
        {
          number: '9',
          day: '27'
        }
      ]
    },
    {
      month: '04',
      links: [
        {
          number: '10',
          day: '10'
        },
        {
          number: '11',
          day: '20'
        },
        {
          number: '12',
          day: '27'
        }
      ]
    },
    {
      month: '05',
      links: [
        {
          number: '13',
          day: '10'
        },
        {
          number: '14',
          day: '20'
        },
        {
          number: '15',
          day: '27'
        }
      ]
    },
    {
      month: '06',
      links: [
        {
          number: '16',
          day: '10'
        },
        {
          number: '17',
          day: '20'
        },
        {
          number: '18',
          day: '27'
        }
      ]
    },
    {
      month: '07',
      links: [
        {
          number: '19',
          day: '10'
        },
        {
          number: '20',
          day: '20'
        },
        {
          number: '21',
          day: '27'
        }
      ]
    },
    {
      month: '08',
      links: [
        {
          number: '22',
          day: '10'
        },
        {
          number: '23',
          day: '20'
        },
        {
          number: '24',
          day: '27'
        }
      ]
    },
    {
      month: '09',
      links: [
        {
          number: '25',
          day: '10'
        },
        {
          number: '26',
          day: '20'
        },
        {
          number: '27',
          day: '27'
        }
      ]
    },
    {
      month: '10',
      links: [
        {
          number: '28',
          day: '10'
        },
        {
          number: '29',
          day: '20'
        },
        {
          number: '30',
          day: '27'
        }
      ]
    },
    {
      month: '11',
      links: [
        {
          number: '31',
          day: '10'
        },
        {
          number: '32',
          day: '20'
        },
        {
          number: '33',
          day: '27'
        }
      ]
    },
    {
      month: '12',
      links: [
        {
          number: '34',
          day: '10'
        },
        {
          number: '35',
          day: '20'
        },
        {
          number: '36',
          day: '27'
        }
      ]
    }
  ],
  industrial: [
    {
      month: '01',
      links: [
        {
          number: '1',
          day: '16'
        }
      ]
    },
    {
      month: '02',
      links: [
        {
          number: '2',
          day: '16'
        }
      ]
    },
    {
      month: '03',
      links: [
        {
          number: '3',
          day: '16'
        }
      ]
    },
    {
      month: '04',
      links: [
        {
          number: '4',
          day: '16'
        }
      ]
    },
    {
      month: '05',
      links: [
        {
          number: '5',
          day: '16'
        }
      ]
    },
    {
      month: '06',
      links: [
        {
          number: '6',
          day: '16'
        }
      ]
    },
    {
      month: '07',
      links: [
        {
          number: '7',
          day: '16'
        }
      ]
    },
    {
      month: '08',
      links: [
        {
          number: '8',
          day: '16'
        }
      ]
    },
    {
      month: '09',
      links: [
        {
          number: '9',
          day: '16'
        }
      ]
    },
    {
      month: '10',
      links: [
        {
          number: '10',
          day: '16'
        }
      ]
    },
    {
      month: '11',
      links: [
        {
          number: '11',
          day: '16'
        }
      ]
    },
    {
      month: '12',
      links: [
        {
          number: '12',
          day: '16'
        }
      ]
    }
  ]
};
