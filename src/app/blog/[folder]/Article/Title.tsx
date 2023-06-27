/* eslint-disable @next/next/no-img-element */
import { n, s } from '@/types'
import css from './Title.module.css'
import { ReactNode } from 'react'
import { getArticleTitleSvg } from '../articleApi'

interface Title {
  folder: s
  card: s
  title?: s
  scaleDown?: s
}

export function Title(p: Title) {
  if (!p.folder.endsWith('_case_study')) return <Title_ {...p} />

  return (
    <Wrapper>
      <img className={css.card} src={p.card} alt="" />
      <h1 className={css.header + ' maru'} dangerouslySetInnerHTML={{ __html: p.title || '' }} />
    </Wrapper>
  )
}

function Title_(p: Title) {
  // do not paste svg into text.md because it will be split by \n during parsing
  const svg = getArticleTitleSvg(p.folder)
  return (
    <Wrapper>
      <img className={css.card} src={p.card} alt="" />
      <div
        className={css.title}
        style={{ maxWidth: 65 / (p.scaleDown ? +p.scaleDown : 1) + 'rem' }}
        dangerouslySetInnerHTML={{ __html: svg }}
      />
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

// export function RenderTitle({ gradient }: { gradient: s }) {
//   const stops = generateGradientStops(gradientToStopsData(gradient))
//   return (
//     <Wrapper>
//       <div className={css.title}>
//         {/* paste paths, paste viewbox, replace x1-y2 in defs, then copy result from browser to article */}
//       </div>
//     </Wrapper>
//   )
// }

// const offsets = [0, 0.29, 0.43, 0.52, 0.61, 1]

// function gradientToStopsData(gradient: s) {
//   const stops = gradient
//     .replace('linear-gradient(45deg, ', '')
//     .split(',')
//     .map((stop) => stop.trim())
//   return stops.map((stop, i) => ({ offset: offsets[i], color: stop.split(' ')[0] }))
// }

// type RawStop = { offset: n; color: s }
// type RawStops = RawStop[]

// function generateGradientStops(stopsData: RawStops) {
//   const allColors = stopsData.map((stop) => stop.color)
//   const colors = [...allColors, ...allColors.reverse().slice(1, -1)] // create a circular array and then shift it below

//   return stopsData.map((stop, index) => {
//     const values = [...colors.slice(index), ...colors.slice(0, index), stop.color].join(';')
//     return { ...stop, values }
//   })
// }
