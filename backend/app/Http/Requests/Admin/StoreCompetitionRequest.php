<?php

declare(strict_types=1);

namespace App\Http\Requests\Admin;

use App\Enums\CompetitionCategory;
use App\Enums\CompetitionStatus;
use App\Enums\CompetitionTargetLevel;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Enum;

class StoreCompetitionRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()?->isAdmin() ?? false;
    }

    protected function prepareForValidation(): void
    {
        $merge = [];

        if ($this->has('min_team_members') && ! $this->has('min_team_member')) {
            $merge['min_team_member'] = $this->input('min_team_members');
        }

        if ($this->has('max_team_members') && ! $this->has('max_team_member')) {
            $merge['max_team_member'] = $this->input('max_team_members');
        }

        if ($this->has('submission_end') && ! $this->has('submission_deadline')) {
            $merge['submission_deadline'] = $this->input('submission_end');
        }

        if ($this->has('is_active') && ! $this->has('is_published')) {
            $merge['is_published'] = $this->boolean('is_active');
        }

        if ($this->has('quota_batch_1') || $this->has('quota_batch_2')) {
            $batch1 = (int) $this->input('quota_batch_1', 20);
            $batch2 = (int) $this->input('quota_batch_2', 20);

            $merge['quota_batch_1'] = $batch1;
            $merge['quota_batch_2'] = $batch2;
            $merge['quota'] = $batch1 + $batch2;
        }

        if (! empty($merge)) {
            $this->merge($merge);
        }
    }

    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'slug' => ['nullable', 'string', 'max:255', 'unique:competitions,slug'],
            'category' => ['required', new Enum(CompetitionCategory::class)],
            'description' => ['required', 'string'],
            'theme' => ['nullable', 'string', 'max:255'],
            'target_level' => ['required', new Enum(CompetitionTargetLevel::class)],
            'registration_fee' => ['required', 'integer', 'min:0'],
            'registration_fee_batch_1' => ['nullable', 'integer', 'min:0'],
            'registration_fee_batch_2' => ['nullable', 'integer', 'min:0'],
            'quota_batch_1' => ['required', 'integer', 'min:1'],
            'quota_batch_2' => ['required', 'integer', 'min:1'],
            'quota' => ['required', 'integer', 'min:2'],
            'min_team_member' => ['required', 'integer', 'min:1'],
            'max_team_member' => ['required', 'integer', 'gte:min_team_member'],
            'registration_start' => ['nullable', 'date'],
            'registration_end' => ['nullable', 'date', 'after:registration_start'],
            'submission_start' => ['nullable', 'date'],
            'submission_deadline' => ['nullable', 'date', 'after:submission_start'],
            'status' => ['nullable', new Enum(CompetitionStatus::class)],
            'is_published' => ['nullable', 'boolean'],
            'guidebook_url' => ['nullable', 'string', 'max:255'],
            'poster_url' => ['nullable', 'string', 'max:255'],
        ];
    }
}
