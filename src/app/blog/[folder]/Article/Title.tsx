import { n, s } from '@/types'
import css from './Title.module.css'
import { ReactNode } from 'react'
import { getArticleTitleSvg } from '../articleApi'

export function Title(p: { folder: s }) {
  // do not paste svg into article because it will be split by \n during parsing
  const svg = getArticleTitleSvg(p.folder)
  return (
    <Wrapper>
      <div className={css.title} dangerouslySetInnerHTML={{ __html: svg }} />
    </Wrapper>
  )
}

function Wrapper({ children }: { children: ReactNode }) {
  return (
    <div className="w100">
      <div className="center w100">{children}</div>
    </div>
  )
}

export function RenderTitle({ stopsData }: { stopsData: RawStops }) {
  const stops = generateGradientStops(stopsData)
  return (
    <Wrapper>
      {/* paste svg here then copy it from browser to article */}
      <defs>
        <linearGradient id="lll" x1="-2.36425" y1="381.567" x2="345.976" y2="-183.815" gradientUnits="userSpaceOnUse">
          {stops.map(({ color, offset, values }) => (
            <stop key={color} offset={offset} stop-color={color}>
              <animate attributeName="stop-color" values={values} dur="5s" repeatCount="indefinite" />
            </stop>
          ))}
        </linearGradient>
      </defs>
    </Wrapper>
  )
}

// const stopsData = [
//   { offset: 0, color: '#F2DF0D' },
//   { offset: 0.29, color: '#B9F20D' },
//   { offset: 0.43, color: '#70F20D' },
//   { offset: 0.52, color: '#18F20D' },
//   { offset: 0.61, color: '#0DF269' },
//   { offset: 1, color: '#0DF2CC' },
// ]

type RawStop = { offset: n; color: s }
type RawStops = RawStop[]

function generateGradientStops(stopsData: RawStops) {
  const allColors = stopsData.map((stop) => stop.color)
  const colors = [...allColors, ...allColors.reverse().slice(1, -1)] // create a circular array and then shift it below

  return stopsData.map((stop, index) => {
    const values = [...colors.slice(index), ...colors.slice(0, index), stop.color].join(';')
    return { ...stop, values }
  })
}
