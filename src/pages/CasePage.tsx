import { useNavigate } from 'react-router-dom'
import { cases } from '../data'
import CaseCard from '../components/CaseCard'

export default function CasesPage() {
  const navigate = useNavigate()

  return (
    <div className="grid gap-4">
      {cases.map(caseItem => (
        <CaseCard
          key={caseItem.id}
          caseItem={caseItem}
          onClick={() => navigate(`/case/${caseItem.id}`)}
        />
      ))}
    </div>
  )
}