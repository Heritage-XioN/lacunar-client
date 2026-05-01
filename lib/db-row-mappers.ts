type DbRecord = Record<string, unknown>;

export function mapClient(row: DbRecord) {
	return {
		id: row.id,
		fullName: row.full_name,
		email: row.email,
		phoneNumber: row.phone_no,
		createdAt: row.created_at,
	};
}

export function mapConsultant(row: DbRecord) {
	return {
		id: row.id,
		fullName: row.full_name,
		email: row.email,
		role: row.role,
		phoneNumber: row.phone_no,
		createdAt: row.created_at,
		updatedAt: row.updated_at,
	};
}

export function mapConsultationSession(row: DbRecord) {
	return {
		id: row.id,
		clientId: row.client_id,
		category: row.category,
		status: row.status,
		onBoardingDetails: row.onBoarding_details,
		createdAt: row.created_at,
		updatedAt: row.updated_at,
	};
}

export function mapSummary(row: DbRecord) {
	const consultant = row.consultants;

	return {
		id: row.id,
		consultationSessionId: row.consultation_session_id,
		consultantId: row.consultant_id,
		title: row.title,
		summary: row.summary,
		createdAt: row.created_at,
		updatedAt: row.updated_at,
		consultant:
			consultant && typeof consultant === 'object'
				? mapConsultant(consultant as DbRecord)
				: null,
	};
}

export function mapReview(row: DbRecord) {
	return {
		id: row.id,
		engagementQuality: row.engagement_quality,
		fullName: row.fullName,
		role: row.role,
		organisation: row.organisation,
		social: row.social,
		feedback: row.feedback,
		createdAt: row.created_at,
	};
}
