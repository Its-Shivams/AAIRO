function CouncilMemberCard({ member }) {
  return (
    <div className="rounded-xl bg-white/10 p-5 text-center">

      {/* Photo */}
      {member.image ? (
        <img
          src={member.image}
          alt={member.name}
          className="mx-auto h-32 w-32 rounded-full object-cover"
        />
      ) : (
        <div className="mx-auto flex h-32 w-32 items-center justify-center rounded-full bg-white/20 text-3xl">
          {member.name.charAt(0)}
        </div>
      )}

      {/* Name */}
      <h3 className="mt-4 text-xl font-semibold">
        {member.name}
      </h3>

      {/* Role */}
      <p className="mt-1">
        {member.role}
      </p>

      {/* Branch and Year */}
      <p className="mt-1 text-sm text-white/60">
        {member.branch} • {member.year}
      </p>

      {/* LinkedIn */}
      {member.linkedin && (
        <a
          href={member.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-block text-sm underline"
        >
          LinkedIn
        </a>
      )}

    </div>
  );
}

export default CouncilMemberCard;