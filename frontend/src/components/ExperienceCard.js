export default function ExperienceCard({ data }) {
  return (
    <div className="border rounded p-4 shadow">
      <h3 className="text-lg font-semibold">{data.title || data.name}</h3>
      {data.description && <p className="mt-2">{data.description}</p>}
      {data.org && <p className="text-sm text-gray-500">Organisation: {data.org}</p>}
    </div>
  );
}
